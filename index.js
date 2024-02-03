// In this assignment, you will build a server using NodeJs. Your server should listen on port 5500.
// 1.It should use the http module to create an HTTP server.
// 2.It should listen on port 5500.
// 3.It should log a message to the console when it starts listening on port 5500.
// 4.If you request this url “/” then the response is  “This is Home Page”.
// 5.If you request this url “/about” then the response is  “This is About Page”.
// 6.If you request this url “/contact” then the response  is “This is Contact Page”.
// 7.If you request this url “/file-write” then fs.writeFile() method will create a file “demo.txt” and write the text “hello world” in this file.
// 8. Show how to upload a file using multer. 
// 9.And of course you need to end the server response using res.end()



const http = require("http")
const myFs = require("fs")
http.createServer(function(req,res){
if(req.url == "/"){
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write("This is Home page.")
    res.end()
}
else if(req.url == "/about"){
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write("This is About page.")
    res.end()
}
else if(req.url == "/contact"){
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write("This is contact page.")
    res.end()
}
else if(req.url == "/file-write"){
    myFs.writeFile("demo.txt", "hello world", function(err){
        if(err){
            res.writeHead(200, {"Content-Type":"text/html"})
            res.write("File created and content written Error !")
            res.end()
        }
        else{
            res.writeHead(200, {"Content-Type":"text/html"})
            res.write("File created an content written successful.")
            res.end()
        }
    })
}
}).listen(5500, function(){
    console.log("Server is listening on port 5500")
})


// file upload use multer

const express = require("express")
const multer = require("multer")
const app = express()
let storage = multer.diskStorage({
    destination:function(req, file, callback){
        callback(null, "./fileupload")
    },
    filename:function(req, file, callback){
        callback(null, file.originalname)
    }
})
let upload = multer({storage : storage}).single("myfile")
app.post("/file-upload", function(req, res){
    upload(req, res, function(err){
        if(err){
            res.end("File upload failed !")
        }
        else{
            res.end("File upload successful...")
        }
    })
})
app.listen(5500, function(){
    console.log("Server is listening on port 5500")
})


