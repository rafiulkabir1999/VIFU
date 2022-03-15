const express=require('express')
const mongoose =require('mongoose')
const Student=require('../Model/Student')
const StudentRouter=express.Router()

function LogUser(req,res,next){
    if(req.session.PageRole==="Student")
         next();
       else res.redirect('/login')
}


StudentRouter.get('/',LogUser,(req,res)=>{
    res.render('student')
})



module.exports=StudentRouter;