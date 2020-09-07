const express = require("express");
const app = express();
//const bodyParser = require("body-parser").urlencoded({extended:false});
const path = require("path");
const mongoose = require("mongoose")
const roterLink=require("./routes/router");
app.use(express.static(path.join(__dirname,"assets")));
const multer = require("multer"); // for imgs
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
app.use("/images", express.static(path.join("images")))
//app.use(bodyParser);
 // for imgs location
 app.use(express.json())
 const cors=require("cors")
 app.use(cors({}))
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null , "images");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+ Math.random()*1000+"_imgs"+file.originalname)
    }

})
 // for imgs types
function fileFilter (req, file, cb) {


    if(file.mimetype==="image/png" 
       ||file.mimetype==="image/jpg"
       ||file.mimetype==="image/jpeg")
    {
        cb(null, true)

    }else 
    {
        cb("invalid file type only png , jpg and jpeg is acceptable", false)

    }
  
}

app.set("view engine" ,"ejs")
app.set("views","views")
var store = new MongoDBStore({
    uri: 'mongodb+srv://MahmoudElwan:01015776658@mahmoudelwan-nodejs.jfspq.mongodb.net/myDB2',
    collection: 'mySessions'
  });
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store
  }))
 // for imgs attach in ejs with name="img"
app.use(multer({dest:"images" , storage , fileFilter}).single("img"));

app.use(roterLink)
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb+srv://MahmoudElwan:01015776658@mahmoudelwan-nodejs.jfspq.mongodb.net/myDB2",
{useNewUrlParser:true , useUnifiedTopology:true})
app.listen(process.env.PORT||3000,()=>{
    console.log("server is running");
})
