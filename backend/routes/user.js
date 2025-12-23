import { Router } from "express";
import { Account, User } from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router1 = Router();
router1.post("/signup",async (req,res)=>{
    try{
    const {username,email,password}=req.body;
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const user=new User({
        name:username,
        email,
        password
        });
        // persist user so pre-save hooks (e.g., password hashing) run and the user is stored in DB
        await user.save();
        const userId=user._id;
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })
const token=jwt.sign({userId},process.env.JWT_SECRET)
res.status(201).json({message:"User created successfully",token})
    }
    catch(error){
        res.status(500).json({message:"internal server error",error:error.message})
    }
    })

router1.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);
    res.json({message:"Login successful",token});
})
router1.put("/updateProfile",async(req,res)=>{
    try{
await User.updateOne({_id:req.body.userId},req.body)
res.json({message:"Profile updated successfully"})
    }
    catch(error){
        res.status(500).json({message:"internal server error",error:error.message})
    }
})
router1.get("/bulk",async (req,res)=>{
    try{
        const filter=req.query.filter||"";
        const users=await User.find({
            $or:[
                {name:{$regex:filter,$options:"i"}},
                {email:{$regex:filter,$options:"i"}}
            ]
        })
        res.json({users:users.map((user)=>({name:user.name,email:user.email}))})
    }
    catch(error){
        res.status(500).json({message:"internal server error",error:error.message})
    }
})
export default router1;