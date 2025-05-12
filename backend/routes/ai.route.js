import express from "express";
import {createaiagent} from "../controllers/aiagent.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router=express.Router();

router.post("/",verifyToken,createaiagent);
export default router;