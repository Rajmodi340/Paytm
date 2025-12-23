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
    try{
const session =await Account.startSession();
session.startTransaction();
const {amount,to}=req.body;
const account=await Account.findOne({userId:req.userId}).session(session);
if(!account||account.balance<amount){
    await session.abortTransaction();
    session.endSession();
    return res.status(404).json({message:"insufficient balance"});
}
    }
    catch(error){
        res.status(500).json({message:"internal server error",error:error.message});
    }
    const  toAccount=await Account.findOne({userId:to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({message:"Recipient account not found"});
    }
    // perform the transaction
    await Account.updateOne(
        {userId:req.userId},
        {$inc:{balance:-amount}}
    )
    await Account.updateOne(
        {userId:to},
        {$inc:{balance:amount}}
    )
    await session.commitTransaction();
    session.endSession();
    res.json({message:"Transfer successful"});
})
export default router2;