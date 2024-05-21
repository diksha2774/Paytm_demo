const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://dikshasugandhi277:diksha2774@cluster0.xzbbccc.mongodb.net/Paytm")


const userschema = new mongoose.Schema({
    username :String,
    firstname :String,
    lastname:String ,
    password:String
})
const user = mongoose.model("User",userschema);

const accountschema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
        },
    balance:{
        type:Number,
        required:true
    }
});
const account = mongoose.model("Account",accountschema)


module.exports={
    account,user
}

// const mongoose=require('mongoose');

// //mongoose.connect('mongodb+srv://omkharadkar:omismongodb0204@cluster0.7btfa2c.mongodb.net/User');
//  mongoose.connect("mongodb+srv://dikshasugandhi277:diksha2774@cluster0.xzbbccc.mongodb.net/Paytm")

// const DataSchema=mongoose.Schema({
//     username:String,
//     firstname:String,
//     lastname:String,
//     password:String

// })

// const User=mongoose.model('User',DataSchema)

// module.exports={
//     User
// }