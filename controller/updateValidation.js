const {check, ValidationResult}= require("express-validator");

module.exports.validationupdated=[
    check("firstname","invalid data").matches(/[a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    check("lastname","invalid data").matches(/[a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    check("username","invalid data").matches(/[a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    check("email" ,"invalid data").isEmail(),
    check("oldPassword","invalid data").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ),
    check("newPassword","invalid data").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ),
    check("confirmNewPassword","invalid data").custom((value ,{req})=>{
        if(value !== req.body.newPassword){
            throw new Error("password Confirmation not match password");
        }
        return true;
    })
]