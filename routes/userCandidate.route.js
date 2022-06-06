
const {Router}=require('express');
const fs = require('fs');
const CandidateRouter = Router();

CandidateRouter.post("/create",(req,res)=>{
fs.readFile("./db.json","utf-8",(err, data)=>{
    var parsed=JSON.parse(data)
    let ID=parsed.id;
    parsed.user=[...parsed.user,req.body];
    fs.writeFile("./db.json",JSON.stringify(parsed),()=>{
        res.status(201);
        console.log(ID)
        res.end("user created",ID)
    
    })
})
})

module.exports = CandidateRouter;