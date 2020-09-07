const mongoose = require("mongoose");



const userSchema= new mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
   firstname:{type:String , require:true},
   lastname:{type:String , require:true},
   username :{type:String , require:true},
   email    :{type:String , require:true},
   password :{type:String , require:true},
   imgURl :String 
});


const userData= mongoose.model("user", userSchema);
module.exports=userData;