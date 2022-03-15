const express=require('express')
const Router=express.Router();

function LogUser(req,res,next){
    if(req.session.PageRole==="Faculty")
         next();
       else res.redirect('/login')
}

Router.get('/',LogUser,(req,res)=>{
    res.render('faculty')
})
module.exports=Router;