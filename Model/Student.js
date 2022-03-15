const mongoose=require('mongoose')

var Account=  mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    department:{
        type:String,
       
    },
    position:{
        type:String,
    },
    approve:{
        type:Boolean,
        default:false
    }
});

var AllAccount=mongoose.model("Accounts",Account)
module.exports= AllAccount;