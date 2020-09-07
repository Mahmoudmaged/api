const {check,validationResult}=require("express-validator");
const bcyrpt = require("bcrypt")
const  usermodel  = require("../model/user");

module.exports.updateuserInfo=async(req,res)=>{
  const {firstname,lastname,username,email,oldPassword,newPasssword,
    confirmNewPassword}=req.body;
const errors=validationResult(req);
//console.log(errors);
if(errors.isEmpty()){
     const user = await usermodel.findOne({_id:req.session.UserID});

            if(user){
                  const match = bcyrpt.compare(oldPassword,user.password);
                        if(match)
                        {
                          bcyrpt.hash(newPasssword,8, async(err,hash)=>{
                              console.log(req.session.UserID );
                            await   usermodel.findOneAndUpdate({_id:req.session.UserID },
                                {firstname,lastname,username,email,password:hash})

                                res.redirect("/profile")

                          })
                        }
                        else
                        {
                            res.json({pageTitle:req.session.UserName,messageError:errors.array() , 
                                userinfo:{firstname,lastname,username,email,oldPassword,newPasssword,
                                confirmNewPassword} ,userPic:req.session.Pic})
                        }
            }
            else
            {
                res.json({pageTitle:req.session.UserName,messageError:errors.array() , 
                    userinfo:{firstname,lastname,username,email,oldPassword,newPasssword,
                    confirmNewPassword},userPic:req.session.Pic})
            }
}
else
{
    res.json({pageTitle:req.session.UserName,messageError:errors.array() , 
        userinfo:{firstname,lastname,username,email,oldPassword,newPasssword,
        confirmNewPassword} , userPic:req.session.Pic})
}



}