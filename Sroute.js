const express=require("express");
const path=require("path");
const ejs=require("ejs");


const app=express();

// it check the dirname and read all the files in the dir path
app.set("views",path.join(__dirname,"Layout"));
//  It works as view engine with node
app.set("view engine","ejs");

app.get("/:filename",(req,res)=>{
    //It Reads the route path and get the data what you entered in the route
    var files=req.params.filename;

    // it render the file data what you entered in the path
    res.render(files)
})


app.listen(4500);
console.log("Server Started : http://localhost:4500")