const express = require("express");
const app = express();
app.get('/', function (req,res){
    res.send("Hello API!")
})
app.listen(3012, function(){
    console.log("API get started")
})