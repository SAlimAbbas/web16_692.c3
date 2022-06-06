

const express=require('express');
const VouterRouter=require('./routes/userVoter.route');
// const CandidateRouter=require('./routes/userCandidate.route');
const fs = require('fs');


const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/user",VouterRouter);


const PORT=process.env.PORT || 8080;
app.get('/', function(req, res){
    fs.readFile("./db.json","utf8",function(err, data){
        res.setHeader("content-type", "application/json");
        res.end(data);
    })
})


app.listen(PORT,()=>{
    console.log(`server starting at ${PORT}`);
});