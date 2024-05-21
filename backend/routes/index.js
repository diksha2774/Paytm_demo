const express = require("express");
const userRouter = require("./user");
const accountroute=require("./account")
const router = express.Router();
router.use("/user",userRouter);
router.use("/account",accountroute);
module.exports=router;


// const express=require('express')
// const router1=express.Router();
// const userRouter=require('./user')

// router1.use('/user',userRouter)
// //export router1 directly
// module.exports=
//     router1
