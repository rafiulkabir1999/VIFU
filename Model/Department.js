const mongoose=require("mongoose")

const DEPT=mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    short:{
        type:String,

    },
    courses:[
        {
            name:{
                type:String
            },
            id:{
                type:String
            },
            time:{
                type:String
            },
            day:{
                type:String
            }
        }
            ],
    faculty:[
        {
            name:{
                type:String,
            },
            id:{
                type:String,
            }
        }
          
            ]


})
const Department = mongoose.model("Department",DEPT);
module.exports = Department;