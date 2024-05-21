const express = require("express");
const router = express.Router();
const {user, account} = require("../db.js");
const zod =require("zod");
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken")
const authMiddleware=require("../middleware.js")
const schema = zod.object({
    username: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
}
);

const updatatedBody = zod.object({
    new_firstname:zod.string(),
    new_lastname:zod.string(),
    new_password:zod.string()
})

router.put("/",authMiddleware,async(req,res)=>{
    const new_firstname = req.body.new_firstname;
    const new_lastname = req.body.new_lastname;
    const new_password = req.body.new_password;
    const newdata={
        new_firstname:new_firstname,
        new_lastname:new_lastname,
        new_password:new_password
    }
const verify = updatatedBody.safeParse(newdata);
if(!verify.success){
return res.json({ msg  : "add valid updates"})
}
//this find anyone whose firstname or lasname contains filter parameter .
//For example, if the filter string is "John", the code will return users whose first name or last name contains "John", such as "John Doe" or "Jane Johnson"
await user.updateOne({_id: req.userId},{$set:{
    firstname:new_firstname,
    lastname:new_lastname,
    password:new_password
    }})
res.json({
    msg:"updated successfully"
})


})



router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await user.find({
        $or:[{
            firstname:{
                "$regex":filter
            },
        },{
            lastname:{
                "$regex":filter
            },
        }]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })
})


router.post("/Signup", async(req,res)=>{

const Single_user = {
    username : req.body.username,
     firstname: req.body.firstname,
     lastname : req.body.lastname,
     password :req.body.password
}

const verify = schema.safeParse(Single_user)

if(!verify.success){
    
   return res.json({
        msg:"give valid inputs"
    })
}

const existinguser = await user.findOne({
    username:req.body.username
})
console.log(existinguser)
if(existinguser){
    return res.json({
        msg:"username already taken"
    })
}
const newuser = await user.create( {
    username : req.body.username,
     firstname: req.body.firstname,
     lastname : req.body.lastname,
     password :req.body.password
})

const userId = newuser._id;


await account.create({
    userId,
    balance:1+Math.random()*10000
})


const token = jwt.sign({
    userId
},JWT_SECRET)

res.json({
    msg:"user created",
    token:token
})
})

const signinSchema=zod.object({
    username:zod.string(),
    password:zod.string()
})
router.post("/Signin",async(req,res)=>{
    const user_data={
        username:req.body.username,
        password:req.body.password
    }
const verify = signinSchema.safeParse(user_data)
if(!verify.success){
     res.json({msg:"enter valid data"})
}

const user_ = await user.findOne({
    username:req.body.username,
    password:req.body.password
})

if(user_){
    const token=jwt.sign({userId:user_._id},JWT_SECRET);
    res.json({
        token:token
    })
    return ;
}
res.status(411).json({
    msg:"error while logging in . Enter correct pasword or username"
})
})
module.exports=router;

