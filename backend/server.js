import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js'
import reviewRouter from './routes/review.route.js'
import gigRouter from './routes/gig.route.js'
import orderRouter from './routes/order.route.js'
import conversationRouter from './routes/conversation.route.js'
import messageRouter from './routes/message.route.js'
import authRouter from './routes/auth.route.js'
import aiagentRouter from './routes/ai.route.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { configDotenv } from 'dotenv';

import cors from 'cors';
const app=express();
try{
    await mongoose.connect('mongodb+srv://qa651285:6xen18syKitU77w1@cluster0.0dcez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbname=fiver')
   console.log("mongodb connected")
}catch(error){
   console.log(error)
};
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
 app.use(express.json());
 app.use(cookieParser());
 app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET 
}));

 
app.use("/api/user",userRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/orders", orderRouter);
app.use("/api/conversations", conversationRouter);

app.use("/api/messages", messageRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/auth", authRouter);
app.use("/api/aiagent",aiagentRouter);

app.listen(8800,()=>{
    console.log("server is running")
})