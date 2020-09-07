const usermodel = require("../model/user");

module.exports.showprofile=async(req,res)=>{
//console.log(req.session.UserID);
 const userinfo =  await  usermodel.findOne({_id:req.session.UserID});
  res.json({userinfo,pageTitle:req.session.UserName,messageError:[] ,userPic:req.session.Pic});
}