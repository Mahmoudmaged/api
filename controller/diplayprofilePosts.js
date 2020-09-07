const notesmodel = require("../model/notes")

module.exports.profilePosts=async(req,res)=>{
      const productContainer = await notesmodel.find({UserID:req.session.UserID}).populate("UserID");
     // res.json(productContainer);
     console.log(req.session.Pic);
     res.json({productContainer, pageTitle:req.session.UserName , userPic:req.session.Pic});
}