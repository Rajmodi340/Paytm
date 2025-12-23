import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URL)
const userschema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        lowercase:true,
        unique:true,
        validator:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlenght:6
    }
})
const accountschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true,
    }
   

})
userschema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,10);
})
  export const User=mongoose.model("User",userschema);
    export const Account=mongoose.model("Account",accountschema);