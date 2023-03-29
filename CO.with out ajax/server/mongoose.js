const mongoose=require("mongoose");

const ConnectionString="mongodb://127.0.0.1:27017/College";

mongoose.connect(ConnectionString,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connected to DataBase !!!")
})
.catch((err)=>{
    console.log(err)
})


module.exports=mongoose;