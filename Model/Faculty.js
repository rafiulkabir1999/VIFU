const mongoose=require('mongoose')
var faculty= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    }
})
var Faculty=mongoose.model("Faculty",faculty)
module.exports=Faculty;