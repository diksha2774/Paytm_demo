const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
const authheader = req.headers.authorization;
 if(!authheader){
    return res.status(403).json({msg:"er"})
 }
 const token = authheader.split(" ")[1];
 console.log(authheader)
 console.log(token)

try{
    console.log("hey")
    const decoded = jwt.verify(token,JWT_SECRET);
    console.log(decoded)
    if(decoded.userId){
        req.userId = decoded.userId;
        console.log(".."+req)
        next(); 

    }else{
        return res.status(403).json({msg:"else "})
    }
}catch(err){
    return res.status(403).json({msg:"error  "})
}
}

module.exports =authMiddleware;