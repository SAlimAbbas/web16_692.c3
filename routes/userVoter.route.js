
const {Router}=require('express');
const fs = require('fs');
const VouterRouter = Router();

VouterRouter.post("/create",(req,res)=>{
fs.readFile("./db.json","utf-8",(err, data)=>{
    const parsed=JSON.parse(data)
    parsed.user=[...parsed.user,req.body];
    fs.writeFile("./db.json",JSON.stringify(parsed),()=>{
        res.status(201);
        res.end("user created",req.body.id);
    })
})
})



VouterRouter.post("/login",(req,res)=>{
    fs.readFile("./db.json",{encoding:"utf-8"},(err,dat)=>{
      const parsed=JSON.parse(dat)
      var flag=false
     var dat;
     var token=Math.random().toString();
      parsed.user.map(elem=>{
        if(elem.username==req.body.username){
          flag=true
          elem.token=token
        }
      })
      if(!flag){
        var payload={
          "status":"Invalid Credentials",
          
  
        }
  
        res.status(401).end(JSON.stringify(payload))
      }
  
   

  
  
      fs.writeFile("./db.json",JSON.stringify(parsed),()=>{
        var payload={
          "status":"Login Successful",
          "token":token
  
        }
        res.end(JSON.stringify(payload))
        })
      // res.end("username added")
       
   })
    
  })

  VouterRouter.post("/logout",(req,res)=>{

    fs.readFile("./db.json",{encoding:"utf-8"},(err,dat)=>{
     const parsed=JSON.parse(dat)
     parsed.users.map(elem=>{
       if(elem.token){
         delete elem["token"]; 
         
       }
   
       console.log(JSON.stringify(parsed.users))
   
       fs.writeFile("./db.json",JSON.stringify(parsed),()=>{
         res.end(JSON.stringify({ status: "user logged out successfully" }))
       })
       
     })
   
   
   
     // res.end(JSON.stringify(parsed.users))
   
    })
   
   })

module.exports = VouterRouter;