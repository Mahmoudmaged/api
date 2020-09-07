
const {check, validationResult}= require("express-validator");
const usermodel= require("../model/user")
const bcrypt = require("bcrypt");
module.exports.signIn = async(req,res)=>{
  const{email , password}= req.body
  const errors= validationResult(req);
 // console.log(errors);
  if(errors.isEmpty()){
    const user = await usermodel.findOne({email});
    //console.log(user);
    if(user){
        const match =  bcrypt.compare(password , user.password);
            if(match)
            {
                req.session.isLoggedIn=true;
                req.session.UserID = user._id;
                req.session.Pic=user.imgURl;
                console.log( req.session.Pic);
                req.session.UserName = user.username;
                console.log(req.session.UserID);
               // const productContainer=  await usermodel.find({})
                res.redirect("/home")
            }
            else{
                res.json(
                {pageTitle:"signIn" , 
                messageError:errors.array() , 
                oldInputs:{email,password },userPic:req.session.Pic })
                
            }
        }else{
          res.json(
          {pageTitle:"signIn" , 
        messageError:[{param:"notfound"}] , 
        oldInputs:{email,password } , userPic:req.session.Pic})
        }

  }
  else{
    res.json({pageTitle:"signIn" , 
    messageError:errors.array() , 
    oldInputs:{email,password:"no email" } , userPic:req.session.Pic})
  }

}