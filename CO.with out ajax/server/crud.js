const express=require("express");
const mongoose=require("mongoose");

const app=express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

const db=require("./mongoose");
const user = require("./user");
const Student=require("./user")
app.set("views","../public")
app.set("view engine","ejs")

            //Using with async and await
// app.get("/",async(req,res)=>{  //It is Index Path
//     var data=await Student.find();
//      res.render("index",{user:data})
// });


// rendering all the data from Database to Front-end
app.get("/",function(req,res){
    var data=Student.find()
    .then(function(data){
        res.render("index",{user:data})
    })
    .catch(function(err){
        console.log(err)
    })
})
// get all users
// app.get("/",(req,res)=>{
//     res.render("index")
// });

                // Getting form front-end using Arrow function
// app.get("/add",(req,res)=>{   //It will get the Register Page
//     res.render("form");
// })

//                 //Getting form front-end
app.get("/add",function(req,res){
    res.render("form")
})

           // To post the data to Database using async and await
// app.post("/Student",async(req,res)=>{
//     const user =new Student({  //To store data into Database
//         id:req.body.id,
//         name:req.body.name,
//         lname:req.body.lname,
//         email:req.body.email,
//         password:req.body.pass,
//         no:req.body.no,
//         gender:req.body.gender,
//         age:req.body.age  
//     })
//     console.log(user)  //It show user data in terminal
//     await user.save() //It save the data to database
//     res.redirect("/")   // After submitting the data it will come back to indexpage
// });

                //To post the data to Database
app.post("/Student",function(req,res){
    const data ={  //To store data into Database
        id:req.body.id,
        name:req.body.name,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.pass,
        no:req.body.no,
        gender:req.body.gender,
        age:req.body.age  
    }
    var user=new Student(data)
    user.save()
    .then(function(user){
        console.log(user)
        console.log("Record Inserted");
    })
    .catch(function(err){
        console.log(err);
    })
    res.redirect("/")   // After submitting the data it will come back to indexpage
});

                //  It will get the data to update the data in the front-end with async and await
// app.get("/edit/:id",async(req,res)=>{
//     var studentid=req.params.id;
//     console.log(studentid)
    
//     var data= await Student.findOne({id:studentid})
//     console.log(data)
//     res.render("edit",{user:data})
// })


            // It will get the data to update the data in the front-end
app.get("/edit/:id",function(req,res){
    var studentid=req.params.id;
    var data=Student.findOne({id:studentid})
    .then(function(data){
        res.render("edit",{user:data})
    })
    .catch(function(err){
        console.log(err)
    })
})


                // it will post data what we are updated
// app.post("/update/:id",async(req, res)=>{
//     var studentid=req.params.id;
//     var user={
//         id:req.body.id,
//         name:req.body.name,
//         lname:req.body.lname,
//         email:req.body.email,
//         password:req.body.pass,
//         no:req.body.no,
//         gender:req.body.gender,
//         age:req.body.age
//     }
//     await Student.findOneAndUpdate(studentid,user)
//     res.redirect("/")  
//     console.log("Record updated")
// })

                // it will post data what we are updated
app.post("/update/:id",function(req, res){
    var studentid=req.params.id;
    var user={
        id:req.body.id,
        name:req.body.name,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.pass,
        no:req.body.no,
        gender:req.body.gender,
        age:req.body.age
    }
    data=Student.updateOne({id:studentid},user)
    .then(function(data){
        console.log("Record Updated")
        console.log(data)  
    })
    .catch(function(err){
        console.log(err)
    })
    res.redirect("/")  
})

// It will Delete the data from Front end with async anda await
// app.get("/delete/:id",async(req,res)=>{
//     var studentid=req.params.id;
//     console.log(studentid)
//     var data=await Student.deleteOne({id:studentid})
//     res.redirect("/")
// })
        // It will Delete the data from Front end with 
app.get("/delete/:id",function(req,res){
    let studentid=req.params.id;

    data=Student.deleteOne({id:studentid})
    .then(function(data){
        console.log(data)
        console.log("Record Deleted")
    })
    .catch(function(err){
        console.log(err)
    })
    res.redirect("/")
})


app.listen(4500);
console.log("Server Started : http://127.0.0.1:4500")