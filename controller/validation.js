const {check, ValidationResult}= require("express-validator");

module.exports.validation=[
    check("firstname","invalid data").matches(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    check("lastname","invalid data").matches(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    check("username","invalid data").matches(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    check("email" ,"invalid data").isEmail(),
    check("password","invalid data").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ),
    check("confirmPassword","invalid data").custom((value ,{req})=>{
        if(value !== req.body.password){
            throw new Error("password Confirmation not match password");
        }
        return true;
    })
]