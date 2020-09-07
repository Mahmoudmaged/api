const notesmosel = require("../model/notes")

module.exports.showHome = async(req,res,next)=>{
    const productContainer=  await notesmosel.find({}).populate("UserID")
  //  res.json(productContainer)
   res.json({productContainer, pageTitle:req.session.UserName ,userPic:req.session.Pic})
}