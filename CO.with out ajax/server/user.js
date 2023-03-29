const mongoose=require("mongoose");

const user=mongoose.Schema({
    id:{
        type:Number,
    },
    name:{
        type:String,
    },
    lname:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String
    },
    gender:{
        type:String
    },
    no:{
        type:Number
    },
    age:{
        type:String
    }
});


module.exports=mongoose.model('users',user)