const mongoose = require("mongoose");
const notschema= new mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
   title:{type:String , require:true},
   desc:{type:String , require:true},
   UserID:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
});


const noteData= mongoose.model("notes", notschema);
module.exports=noteData;