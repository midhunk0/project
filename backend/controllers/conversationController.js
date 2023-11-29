import Chat from "../models/chatModel.js";

export const conversationController = async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedChat = await newChat.save();
    res.status(200).json(savedChat);
  } catch (error) {
    res.status(500).json(error);
  }
};
