import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

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
export const addMessageController = async (req, res) => {
  const newMessage = new Message(req.body);
  console.log(newMessage);
  try {
    const savedMessage = await newMessage.save();
    console.log(savedMessage);
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessageController = async (req, res) => {
  try {
    const messages = await Message.find({
      chatId: req.params.chatId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUnreadMessageCounts = async (req, res) => {
  try {
    // Fetch all conversations
    const conversations = await Chat.find();

    // Object to store unread message counts for each conversation
    const unreadCounts = {};

    // Loop through conversations to calculate unread counts
    for (const conversation of conversations) {
      const unreadCount = await Message.countDocuments({
        chatId: conversation._id,
        read: false,
        sender: { $ne: '6625d50f0ac57115661aa1da' }, // Exclude messages from this sender
      });
      unreadCounts[conversation._id] = unreadCount;
    }

    // Send the unread counts as JSON response
    res.json({ unreadCounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const markMessagesAsRead = async (req, res) => {
  const { chatId } = req.params;
  console.log(req.params);

  try {
    await Message.updateMany(
      { chatId: chatId, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({ message: "Messages marked as read successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to mark messages as read." });
  }
};
