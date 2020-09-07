const usermodel = require("../model/user");

module.exports.addupic=async(req,res)=>{

    await usermodel.findOneAndUpdate({_id:req.session.UserID} ,{imgURl:req.file.path})
    res.json("done");
}