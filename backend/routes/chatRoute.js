import express from "express";
const router=express.Router();
const chatModel = require("../models/chatModel");

//new chat
router.post("/",(req,res) => {
    const newChat = new chatModel({
        members: [req.body.senderId,req.body.recieverId],
    })
})

//get chat of a user


export default router;