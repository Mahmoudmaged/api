const notemodel = require("../model/notes");
const mongoose = require("mongoose")
module.exports.addMyNote = async(req,res,next)=>{
 const {title , desc } = req.body;
  const notes = new  notemodel({
    _id:mongoose.Types.ObjectId(),
    title,
    desc,
    UserID:req.session.UserID 
  })
  await notes.save();
  res.json("add sucsses")
}