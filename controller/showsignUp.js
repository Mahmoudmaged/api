module.exports.showSignUp=(req,res,next)=>{

    res.json(
    {
        pageTitle:"signUp" , 
    messageError:[] , 
    oldInputs:{firstname:'' ,
     lastname:'',username:'',email:'' ,
     password:'' ,confirmPassword :''},
     userPic:req.session.Pic}
     )
}