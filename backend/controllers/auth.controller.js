import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import passport from "passport";
import express from "express";
import session from "express-session";
import nodemailer from "nodemailer";
import otpgenerator from "otp-generator";
import otp from "../models/otp.model.js"
import { verifyToken } from "../middleware/jwt.js";
dotenv.config();


export const register = async (req, res) => {
    const { password } = req.body;
    try {
        const hash = bcrypt.hashSync(password, 10);
        const user = new User({
            ...req.body,
            password: hash,
        });
        await user.save();
        await sendmail(req, res); 
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send("Wrong password or username");
        }
        const token = jwt.sign(
            {
                id: user._id,
                isSeller: user.isSeller,
            },
            process.env.JWT_KEY
        );

        const { password, ...info } = user._doc;
        res
            .cookie("accessToken", token, {
                httpOnly: true,
            })
            .status(200)
            .send(info);
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
};
export const logout = async (req, res) => {
    res.clearCookie("accessToken");
    res.status(200).send("Logged out successfully");

}
export const successGoogleLogin = (req , res) => { 
	if(!req.user) 
		res.redirect('/failure'); 
    console.log(req.user);
	res.send("Welcome " + req.user.email); 
   
}

export const failureGoogleLogin = (req , res) => { 
	res.send("Error"); 
}
export const sendmail = async (req,res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send("Email is required.");
    }
    try{
        const generateotp=otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
            digits:true
        })
        const hashotp=bcrypt.hashSync(generateotp,10);
        const expirytime=new Date(Date.now()+ 10+ 60*1000)
        await otp.deleteOne({ userid: email });

        const otpentry=new otp({
            userid:email,
            otp:hashotp,
            createdAt: new Date(),
            expiresAt:expirytime
        }) 
        await otpentry.save();
        console.log(generateotp);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // or 'STARTTLS'
        auth: {
            user: "qa651285@gmail.com",
            pass: "kugi wbrq hwhl capy",
            },
        });
const mailOptions = {
    from: 'qa651285@gmail.com',
    to: req.body.email,
    subject: 'Verify Email using Node.js',
    text: `Your OTP is: ${generateotp}\nIt is valid for 10 minutes.`,
    html: `<p>Your OTP is: <strong>${generateotp}</strong></p><p>It is valid for 10 minutes.</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}
catch(error){
    console.log(error);
}
}

export const verifyotp = async (req, res) => {
    const  email = req.body.email;
    const  Otp = req.body.otp;

    if (!email || !Otp) {
        return res.status(400).send("Email and OTP are required.");
    }

    try {
        // Find the OTP entry for the given email
        const otpEntry = await otp.findOne({ userid: email });

        if (!otpEntry) {
            return res.status(400).send("Invalid or expired OTP.");
        }

        // Check if OTP has expired
        if (new Date() > otpEntry.expiresAt) {
            // Clean up expired OTP
            await otp.deleteOne({ _id: otpEntry._id });
            return res.status(400).send("OTP has expired.");
        }

        // Compare the provided OTP with the hashed OTP in the database
        const isOtpValid = bcrypt.compareSync(Otp, otpEntry.otp);

        if (!isOtpValid) {
            return res.status(400).send("Invalid OTP.");
        }

        // OTP is valid!
        // 1. Delete the OTP entry so it can't be reused
        await otp.deleteOne({ _id: otpEntry._id });
        res.status(200).send("OTP verified successfully.");

    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).send("Failed to verify OTP.");
    }
};



export const updateuser=async(req,res)=>{
try{
    const { email } = req.params; 
    console.log(email);
    const updateData = req.body;
    console.log(updateData);
    if(!email){
        console.log("Email not found");
        
    }
    console.log(email);

    const updateduser=await User.findOneAndUpdate({email:email},{
        $set: updateData
            
            

        },{new:true});
    
    if (!updateduser) {
        console.log("User not found");
        
    }
    const user=await User.findOne({email:email});
    console.log(user);
    const token = jwt.sign(
        {
            id: user._id,
            isSeller: user.isSeller,
        },
        process.env.JWT_KEY
    );
    
    const { password, ...info } = user._doc;
        res
            .cookie("accessToken", token, {
                httpOnly: true,
            })
            .status(200)
            .send(info);
        
    

    
}


catch(error){
    console.log(error);
}
}
export const checklogin = async (req, res) => {
    try {
      if (!req.userId && !req.isSeller) {
        return res.status(401).send("Kindly login");
      }
      return res.status(200).json({ message: "User is logged in", userId: req.userId, isSeller: req.isSeller });
    } catch (error) {
      console.log("Error in checklogin:", error);
      return res.status(500).send("Internal Server Error");
    }
  };
  

