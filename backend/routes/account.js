const express=require("express");
const authMiddleware = require("../middleware");
const mongoose = require("mongoose")
const { account } = require("../db");
const accountroute = express.Router();
accountroute.get("/balance",authMiddleware,async(req,res)=>{
    const useraccount = await account.findOne({
        userId:req.userId
    })
    res.json({
        balance: useraccount.balance
    })
})
accountroute.post("/transfer",authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount,to}=req.body;

    const uaccount = await account.findOne({
        userId:req.userId
    }).session(session);
console.log("your account " +uaccount)
    if(!uaccount || uaccount.balance< amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg:"insufficient balance"
        });
    }

    const toaccount = await account.findOne({
        userId:to
      }).session(session);
console.log("to acc",toaccount)
    if(!toaccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg:"invalid account"
        });
    }
    await account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})
module.exports=accountroute;