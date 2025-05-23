import express from "express";
import {verifyToken} from "../middleware/jwt.js";
import {createConversation,getConversations,getSingleConversation,updateConversation} from "../controllers/conversation.controller.js";

const router=express.Router();

router.post("/start",verifyToken,createConversation);
router.get("/getall",verifyToken,getConversations);
router.get("/single/:id",verifyToken,getSingleConversation);
router.put("/update/:id",verifyToken,updateConversation);
    


export default router;