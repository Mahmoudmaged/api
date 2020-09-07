const {check, ValidationResult, validationResult}= require("express-validator");
const usermodel= require("../model/user")
const bcrypt = require("bcrypt");
module.exports.signup= async(req,res,next)=>{
  const{firstname , lastname,username,email ,password ,confirmPassword} = req.body;
  const errors= validationResult(req);

  if(errors.isEmpty()){

         const user = await usermodel.findOne({email})
            if(user)
            {
                res.json({pageTitle:"signUp" , 
                messageError:[{param:"exists"}] , 
                oldInputs:{firstname , lastname,username,email ,password ,confirmPassword} ,userPic:req.session.Pic})
            }
            else
            {
                bcrypt.hash(password ,8,(err,hash)=>{
                    usermodel.insertMany({ firstname , lastname,username,email ,password:hash })
                    res.redirect('/index')
                })
            }       
  }
  else
  {
    res.json(
    {pageTitle:"signUp1" , 
    messageError:errors.array() , 
    oldInputs:{firstname , lastname,username,email ,password ,confirmPassword} ,userPic:req.session.Pic})
  }



  

}