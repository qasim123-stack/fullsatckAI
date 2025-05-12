import express from "express";
import { register, login, logout,successGoogleLogin,failureGoogleLogin,sendmail,checklogin,verifyotp } from "../controllers/auth.controller.js";
import Passport from"../passport.js"
import passport from "passport";
import User from "../models/user.model.js";
import axios from "axios";
import { updateuser } from "../controllers/auth.controller.js";
import {verifyToken} from "../middleware/jwt.js";






const router=express.Router();
router.use(passport.initialize()); 
router.use(passport.session());

router.post("/register",register)
router.post("/login",login);
router.post("/logout",verifyToken,logout);
router.get("/login/google",passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
})); 
router.get( '/google/callback', 
	passport.authenticate( 'google', { 
    
		
		failureRedirect: 'http://localhost:3000/failure'
}),

async(req,res)=>{
    // console.log(req.user);
    const email = req.user.emails && req.user.emails[0] ? req.user.emails[0].value : null;
  

let country="Unknown";
try{
    const geoRes = await axios.get(`https://ipinfo.io/json?/token=895d7a1bc27af6`);
            country = geoRes.data.country || "Unknown";
            console.log(country);
}catch(err){
    console.log("couldnt find country");
}
    console.log(country);
    const newUser=new User({
        username:"wasim1",
        email:email,
        password:"34",
        img:req.user.picture,
        country:country


    });
    await newUser.save();

 
    console.log("sucessfully saved")


     
  

  res.redirect(`http://localhost:3000/update/${email}`);
  
   


}
);

// Success 
router.get('/success' , successGoogleLogin); 

// failure 
router.get('/failure' , failureGoogleLogin);
router.post("/sendmail",sendmail);
router.post("/update/:email",updateuser);
router.get("/checklogin",verifyToken,checklogin);
router.post("/verifyotp",verifyotp);




export default router;