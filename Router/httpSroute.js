var http=require("http");
const fs=require("fs");
const url=require("url");

http.createServer((req,res)=>{
    var path=url.parse(req.url,true);
    console.log(path)
    var filename="."+path.pathname;
    console.log(filename)
    fs.readFile(filename,function(err,data){
        if(!err){
            res.write(data);
            res.end();
        }
        else
        {
            res.end("Page Not found")
        }
    })
}).listen(8080);
console.log("server Started: http://localhost:8080")