import React, { useContext, useState, useEffect, useRef } from "react";
import "./RecruiterMessenger.css";
import Message from "./Message";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";

const RecruiterMessenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/recruiters/conversations/${user._id}`
        );
        setConversations(res.data);
        setCurrentChat(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/recruiters/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      chatId: currentChat._id,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/recruiters/messages",
        message
      );
      setMessages([...messages, res.data]);
      console.log(messages);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  return (
    <>
      <div className="recruiterMessenger">
        {conversations ? "" : "loading"}
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <>
              <div className="chatBoxTop">
                {messages ? (
                  <>
                    {messages.map((message) => {
                      return (
                        <div ref={scrollRef} key={message._id}>
                          <Message
                            message={message}
                            own={message.sender === user._id}
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  "loading"
                )}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterMessenger;
