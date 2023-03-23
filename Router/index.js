var express=require("express");
var path=require("path");
const ejs=require("ejs")
var app=express();

app.set("views",path.join(__dirname,"../Layout"))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("index");
    res.render("login");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.get("/student",(req,res)=>{
    res.render("student")
});
app.get("/ab?cd",(req,res)=>{
    res.send("<h2>Get the Data</h2>")
});
app.get("/ab+cd",(req,res)=>{
    res.send("<h2>Add String Patterns</h2>")
});
app.get("/ab*cd",(req,res)=>{
    res.send("<h2>Star Pattern</h2>")
})
app.get("**",(req,res)=>{
    res.send("<h2>Not- Found</h2><p>Page you reuested-Not Found</p>")
});
app.listen(4500)
console.log("Server Started:http://localhost:4500")