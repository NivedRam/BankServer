//import data service folder
const dataservice=require('./New folder/dataservice')
//importy json webtoken
const jwt=require('jsonwebtoken')
//import express
const { request, json } = require("express");
const express= require("express")

//create app

const app=express()
app.use(express.json())

//Middleware for verify the token
const jwtmiddleware=(req,res,next)=>{

console.log(".....router specific middleware.....");
try{
const token=req.headers['access-token']
const data=jwt.verify(token,'secretkey1')
console.log(data);
next()
}
catch{
   res.status(422).json( {
        statusCode:422,
        status:false,
        message:"please login"
    })
}
}




//request

//register
app.post("/login",(req,res)=>{

    const result= dataservice.login(req.body.acno,req.body.psw)
   
    res.status(result.statusCode).json(result)
       console.log(req.body);
    })


//login
app.post("/register",(req,res)=>{

    const result= dataservice.register(req.body.acno,req.body.uname,req.body.psw)

    res.status(result.statusCode).json(result)
       console.log(req.body);
    })

//deposit
app.post("/deposit",jwtmiddleware,(req,res)=>{

    const result= dataservice.deposit(req.body.acno,req.body.psw,req.body.amount)
   
   
    res.status(result.statusCode).json(result)
       console.log(req.body);
    })
//withdraw
app.post("/withdraw",jwtmiddleware,(req,res)=>{

    const result= dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount)
   
   
    res.status(result.statusCode).json(result)
       console.log(req.body);
    })

//transaction history
app.post("/gettransaction",jwtmiddleware,(req,res)=>{

    const result= dataservice. gettransaction(req.body.acno)
   
   
    res.status(result.statusCode).json(result)
       console.log(req.body);
    })
//delete            

// //GET
// app.get("/",(req,res)=>{
//     res.send('get method checking...........')
// })
// //post
// app.post("/",(req,res)=>{
//     res.send('post method checking...........')
// })
// //put
// app.put("/",(req,res)=>{
//     res.send('put method checking...........')
// })

// //patch
// app.patch("/",(req,res)=>{
//     res.send('patch method checking...........')
// })
// //delete
// app.delete("/",(req,res)=>{
//     res.send('delete method checking...........')
// })
//Set port

app.listen(3000,()=>{
    console.log("Server Started");
})