var express=require("express");
var mongoClient=require("mongodb").MongoClient;
var cors=require("cors");

var app=express();
var ConnectionString="mongodb://127.0.0.1:27017";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.get("/getproduct",(req,res)=>{
    mongoClient.connect(ConnectionString,(err,clentObj)=>{
        if (!err){
            var dbo=clentObj.db("Home")
            dbo.collection("Budget").find({}).toArray((err,data)=>{
                if(!err){
                    res.send(data)
                }
                else{
                    console.log(err);
                }
            })
        }
        else{
            console.log(clentObj)
        }
    })
});
app.get("/Category",(req,res)=>{
    mongoClient.connect(ConnectionString,(err,clentObj)=>{
        if (!err){
            var dbo=clentObj.db("Home")
            dbo.collection("tblcategory").find({}).toArray((err,data)=>{
                if(!err){
                    res.send(data)
                }
                else{
                    console.log(err);
                }
            })
        }
    })
});
app.post("/adduser",(req,res)=>{
    var user={
        "id":parseInt(req.body.id),
        "title":req.body.title,
        "price":parseInt(req.body.price),
        "image":req.body.Photo,
        "stock":(req.body.stock=="true")?"Available":"Out of Stock",
        "category":req.body.category
    }
    mongoClient.connect(ConnectionString,(err,clientObj)=>{
        if (!err){
            var dbo=clientObj.db("Home");
            dbo.collection("Budget").insertOne(user,(err,result)=>{
                if(!err){
                    console.log("record inserted");
                }else{
                    console.log(err);
                }
            })
        }
    })
    
});
app.put("/update",(req,res)=>{
    var ProductId=req.params.name;
    var user={
        "Name":req.body.name,
        "Pname":req.body.pname,
        "Price":req.body.Price,
        "Date":req.body.date
    }
    mongoClient.connect(ConnectionString,(err,(ClientObj)=>{
        if(!err){
            var dbo=ClientObj.db("Home")
            dbo.collection("Budget").updateOne({Name:ProductId},user,(err,result)=>{
                if(!err){
                    console.log("Record Updated")
                }
            })
        }
    }))
})
app.listen(4500);
console.log("Server Started: http://localhost:4500");