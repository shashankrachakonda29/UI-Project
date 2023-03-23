var express=require("express");
var path=require("path");
var fs=require("fs");
var ejs=require("ejs");

var app=express();
app.set("views",path.join(__dirname+"../Layout"))
app.set("view engine","ejs")
app.get("/:filename",(req,res)=>{
    var filestring=req.params.filename;
    fs.readFile(filestring,(err,data)=>{
        if(!err){
            res.write(data);
            res.end()
        }else{
            console.log(err);
        }
    })
});
app.listen(4500);
console.log("server Started:http://localhost:4500")
