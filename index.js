const express=require('express')
const RouterAdmin=require('./Route/admin.js')
const RouterFaculty=require('./Route/faculty.js')
const RouterStudent=require('./Route/student.js')
const layout=require('express-ejs-layouts')
const BodyParser = require('body-parser')
const AllAccount=require('./Model/Student')
const faculty=require('./Model/Faculty')
const  mongoose  = require('mongoose')
const session=require('express-session')
const mongodbsession=require('connect-mongodb-session')(session)
const app=express()
const ddepartment=require('./Model/Department')



app.set('layout','tamplate/tamplate')
app.set('view engine','ejs')
app.use(layout)
app.set('trust proxy', 1)

app.use(BodyParser.urlencoded({extended: true }))
app.use(BodyParser.json());
app.use(express.static(__dirname+'/public'))



mongoose.connect("mongodb+srv://nahidulkabir:12345678AC@cluster0.aeubn.mongodb.net/University?retryWrites=true&w=majority")
const db=mongoose.connection
db.on('error',error=>console.log(error))
db.once('connected',()=>{
   app.listen(5000,()=>console.log("your server is running or port 4000 data base connected"))
})
const Store= new mongodbsession({
    uri:"mongodb+srv://nahidulkabir:12345678AC@cluster0.aeubn.mongodb.net/University?retryWrites=true&w=majority",
    collection:"session"
})
app.use(session({
    secret: 'VIFU is the secret key here',
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true },
    store:Store
  })) 


app.use('/admin',RouterAdmin)
app.use('/faculty',RouterFaculty)
app.use('/student',RouterStudent)


app.get('/',(req,res)=>{
    console.log(req.session)
    res.render('homepage')
    
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',async(req,res)=>{

    try {
       // var  User= await AllAccount.findOne({email:req.body.email})
       const User= await AllAccount.findOne({email:req.body.email});
       console.log(User);
       
    
    
    if(User.name===req.body.id && User.position==="Student")
    {
        req.session.logedin=true;
        req.session.PageRole="Student";
        res.redirect('/student')
    }
    else if(User.name===req.body.id && User.position==="Faculty")
    {
        req.session.logedin=true;
        req.session.PageRole="Faculty";
        res.redirect('/faculty')
        
    
    }
    else if(User.name===req.body.id && User.position==="admin")
    {   
        req.session.logedin=true;
        req.session.PageRole="Admin";
        res.redirect('/admin')}

    else{res.send("login Error")}
    console.log(User.name,User.email)
} catch (error) {
    console.log(error)
}
   
    
 })

 app.get('/getDepartment',async(req,res)=>{

    const Department=await ddepartment.find();
   
    console.log(Department)
   res.render('register',{Department:Department})
   // res.send("hello world");
})

app.get('/facultyRegister',async(req,res)=>{
    const Department=await ddepartment.find();
   
    res.render('Fregister',{Department:Department})
})

app.post('/facultyRegister',async(req,res)=>{
    
    try{
        const data=new AllAccount({
            name:req.body.id,
            email:req.body.email,
            department:req.body.degree,
            position:"Faculty"
        })
       await  data.save()
        
   
      res.redirect('/login')
    }catch(error){
        console.log(error)
    }
 })
 
 app.get('/studentRegister',(req,res)=>{
    res.render('register')
   
})
//register student 
app.post('/studentRegister',async(req,res)=>{
    
   try{

    var Student = new   AllAccount({
        name:req.body.id,
        email:req.body.email,
        department:req.body.degree,
        position:"Student"
    });
    await Student.save()
     res.redirect('/login')
   }catch(error){
       console.log(error)
   }

})


app.get('*',(req,res)=>{
    res.render("404")
})

