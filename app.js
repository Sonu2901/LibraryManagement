const express=require("express");
const ejs=require('ejs');
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
var MongoClient = require('mongodb').MongoClient;
const path=require('path');
const { appendFile } = require("fs");
const { body, validationResult } = require("express-validator");
const dbConfig = require('./config/db.config.js');
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
const port=3000;
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url,{   
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
const client = new MongoClient(dbConfig.url);
async function run(obj) {
  try {
    // Connect to the "collections" database and access its "book" collection
    const database = client.db("collections");
    const books = database.collection("book");
    
    // Insert the defined document into the "book" collection
    //temp.push(obj.name);
    const result = await books.insertOne(obj);
    // Print the ID of the inserted document
    //console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
     // Close the MongoDB client connection

  }
}
async function update(obj){
    try{
        const database = client.db("collections");
        const books = database.collection("book");
        console.log(obj.name);
        await books.updateOne({name:obj.name},{$inc:{stocks:parseInt(obj.count)}});
    }
    catch{

    }
}
async function getBooksByAuthorName(auth){
    try{
        const database = client.db("collections");
        const books = database.collection("book");
        //console.log(books);
        const op={Author:auth};
        const res=await books.find(op);
        const data=[];
        await res.forEach(doc=>data.push(doc));
        
        //console.log(data);
        return data;
    }
    finally{

    }
}
async function getBook(nam){
    try{
        const database = client.db("collections");
        const books = database.collection("book");
        //console.log(books);
        const op={name:nam};
        const res=await books.find(op);
        const data=[];
        await res.forEach(doc=>data.push(doc));
        
        //console.log(data);
        return data;
    }
    catch{

    }
}
//  let myobj={name:"The Kite Runner",Author:"Khalid Hosseni",rating:5,stocks:30,price:10};
// run(myobj);
// myobj={name:"Alchemist",Author:"Paulo Coelho",rating:8.8,stocks:30,price:10};
// run(myobj);
// myobj={name:"The Pilgrim’s Progress",Author:"John Bunyan",Rating:7,stocks:60,price:90};
// run(myobj);
// myobj={name:"Emma",Author:"Jane Austen",Rating:6.8,stocks:80,price:45};
// run(myobj);
//console.log(temp);
app.get('/',(req,res)=>{
     res.render('index');
});
app.get('/author',(req,res)=>{
    const author=req.query["author"];
    let books=[];
    getBooksByAuthorName(author).then(x=>{
        res.render("view.ejs",{
            book:x
        })
    });
});
app.get('/book',(req,res)=>{
    const book=req.query["name"];
    const search=url+book+key;
    const data=[];
    fetch(search).then(response=>response.json())
                 .then(jsonData=>{
                    getBook(book).then(x=>{
                        res.render("sbook.ejs",{
                            book:x,
                            data:jsonData
                        })
                        
                    });
                    
                 })
    
    
});
const validate=[
    body('count','Value must be a positive integer.').isInt({ min: 1 })
];
app.post('/add',validate,(req,res)=>{
    const check=validationResult(req);
    if(!check.isEmpty()){
        const arr=check.array();
       res.render("error.ejs",{
            message:arr[0].msg
        })
        
    }
    else{
    response={
        name:req.body.name,
        Author:req.body.Author,
        Rating:7.7,
        stocks:parseInt(req.body.count),
        price:70
    }
     //run(response);
    getBook(req.body.name).then(x=>{
        if(x.length) update(response);
        else run(response);
        res.render("addview.ejs");
    })
}
    
});

app.post('/borrow',validate,(req,res)=>{
    const check=validationResult(req);
    if(!check.isEmpty()){
        const arr=check.array();
       res.render("error.ejs",{
            message:arr[0].msg
        })
        
    }
    else{
    response={
        name:req.body.name,
        count:req.body.count
    }
    getBook(req.body.name).then(x=>{
        if(x.length && x[0].stocks>=parseInt(response.count)){
            res.render('borrow.ejs',{
                res:response,
                book:x  
            });
        }
       else res.render('error.ejs',{
         message:"Sorry We are unable to let you borrow these many books as we are out of stocks."
       });
    })
}
    
});
app.listen(port,()=>{
    console.log("server started at port 3000.");
})
// const fetch = require('node-fetch');
