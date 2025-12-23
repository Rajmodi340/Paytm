import { Router } from "express";

import { Account } from "../models/usermodel.js";
import { authMiddleware } from "../middleware/middleware.js";
const router2=Router();
router2.get("/balance",authMiddleware,async(req,res)=>{
    try{
        const account=await Account.findOne({userId:req.userId});
        if(!account){
            return res.status(404).json({message:"Account not found"});
        }
        res.json({balance:account.balance});
    }
    catch(error){
res.status(500).json({message:"internal server error",error:error.message});
    }
})
router2.post("/transfer",authMiddleware,async(req,res)=>{
    let session;
    try{
        session = await Account.startSession();
        session.startTransaction();

        const { amount, to } = req.body;
        const amt = Number(amount);

        // validate input
        if (!to || isNaN(amt) || amt <= 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Invalid transfer data" });
        }
        if (String(to) === String(req.userId)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Cannot transfer to yourself" });
        }

        const fromAccount = await Account.findOne({ userId: req.userId }).session(session);
        if (!fromAccount || fromAccount.balance < amt) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Recipient account not found" });
        }

        // perform the transaction using session
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amt } },
            { session }
        );

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amt } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.json({ message: "Transfer successful" });
    }
    catch(error){
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        res.status(500).json({message:"internal server error",error:error.message});
    }
})
export default router2;