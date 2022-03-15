const { json } = require('body-parser')
const express=require('express')
const department=require('../Model/Department')
const account=require('../Model/Student')
const Router=express.Router()

function LogUser(req,res,next){
    if(req.session.PageRole==="Admin")
         next();
       else res.redirect('/login')
}



Router.get(['/','/:Department'], LogUser ,async(req,res)=>{
    const All= await department.find()
    const ACC=await account.find();
   //console.log(All)
    const Courses=All.map(e=>{
        return e.courses;
    })
    const filterCourse= Courses.map(e=>{
       const b= e.filter(a=>a.name != null)
       return b;
    })
    const Course=filterCourse.filter(e=>e.length!=0)
    var C=[];
    const B=Course.map(e=>{
        e.map(c=>C.push(c))
    })
    const sa=ACC.filter(e=>e.position==='Student')
    const fa=ACC.filter(e=>e.position==='Faculty')
    
    
    if(req.params.Department===undefined)
    res.render('admin',{All:All,Course:C,FA:fa,SA:sa,AAC:ACC})
    else 
    res.render('DepartmentProfile',{Department:req.params.Department})
})



Router.post('/addDepartment',async(req,res)=>{
     try{
        
        const dept =new department({
            name:req.body.dept,
           
            short:req.body.deptShort,
             courses:[{
                 name:null,
                 id:null,
             }],
             faculty:[{
                 name:null,
                 id:null
             }]
  
        })
       await dept.save()
      res.redirect('/admin')
     }
     catch(error){
         console.log(error)
     }
})
Router.delete('/addDepartment',async(req,res)=>{
    try{
        console.log(req.body.department)
        await department.deleteOne({short:req.body.department});
        
    }catch(error){
        console.log(error)
    }
    res.sendStatus(200)
    
})


Router.post('/addCourses',async(req,res)=>{
    
    const D= await department.findOne({short:req.body.dept})
   var course= {
        name:req.body.courseName,
        id:req.body.courseId,
        time:req.body.Time,
        day:req.body.day
    }
    D.courses.push(course);
   await D.save()
   res.redirect('/admin')
})

Router.post('/addmember',async(req,res)=>{
    

try{
    const a= await account.findOne({email:req.body.email})
    a.approve=true;
   await a.save();
    res.sendStatus(200)
}catch{(error=>console.log(error))}
 
})


Router.delete('/removemember',async(req,res)=>{
    try{
        await account.deleteOne({email:req.body.email})
    }catch{error=>console.log(error)}
    res.sendStatus(200);
})

module.exports=Router;