import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js"

//new conversation
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

//get conversation
export const getConvController = async (req, res) => {
  try {
    const chat = await Chat.find({ 
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    response.status(500).json(error);
  }
};

// post new messages
export const addMessageController = async (req,res) => {
  const newMessage = new Message(req.body);
  try{
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  }catch(error){
    res.status(500).json(error);
  }
}

export const getMessageController = async (req,res) => {
  try{
    const messages = await Message.find({
      chatId: req.params.chatId,
    });
    res.status(200).json(messages);
  }catch(error){
    res.status(500).json(error);
  }
}
