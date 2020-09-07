const router = require("express").Router();
const showsignUp= require("../controller/showsignUp");
const signUpController= require("../controller/signUp");
const validationsignUp= require("../controller/validation");
const showsignIn= require("../controller/showsignIn");
const hanfelsignin= require("../controller/signIn");
const showhome= require("../controller/showhome");
const islogedIn = require("../madlware/auth");
const addNote = require("../controller/notes");
const myProfileseting = require("../controller/profileSting");
const signvalidation = require("../controller/signinvalidation");
const updateuserInfo = require("../controller/updateuserInfo");
const updateValidtion = require("../controller/updateValidation");
const showMyposts = require("../controller/diplayprofilePosts");
const addPic = require("../controller/addpic");
const logout = require("../controller/logout");


router.get("/" ,showsignUp.showSignUp);
router.post("/signUp" ,validationsignUp.validation, signUpController.signup);
router.get("/index" ,showsignIn.showsignIn)
router.post("/login", signvalidation.valid,hanfelsignin.signIn);
//router.patch("/addpic",islogedIn,addPic.addupic);
router.get("/home", islogedIn,showhome.showHome);
router.post("/addnotes",islogedIn,addNote.addMyNote )
router.get("/profile", islogedIn,myProfileseting.showprofile);
router.get("/Accountposts", islogedIn,showMyposts.profilePosts);
router.put("/updateuserInfo",islogedIn,updateValidtion.validationupdated,updateuserInfo.updateuserInfo )
router.get("/logout",logout.logout);
router.get("*",(req,res)=>{
    res.send("404 NotFound")
});
module.exports=router;
