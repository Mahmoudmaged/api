const {check,validationResult}=require("express-validator");

module.exports.valid=[
  
    check("email","invalid data").isEmail(),
    check("password","invalid data").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
]