import React, { useContext, useState, useEffect, useRef } from "react";
import "./AdminMessenger.css";
import Conversation from "./Conversation";
import Message from "./message";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";

const AdminMessenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newmessage, setNewMessage] = useState("");
  const [recruiters, setRecruiters] = useState([]);
  const scrollRef = useRef();
  const [socket, setSocket] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getRecruiters = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/recruiters/getAllRecruiters"
        );
        setRecruiters(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRecruiters();
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/students/conversations/${user._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const res = await axios.get(
            `http://localhost:8080/api/students/messages/${currentChat._id}`
          );
          setMessages(res.data);
        } else {
          setMessages([]); // Clear messages when there is no current chat
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    // Create message object for text message
    const message = {
      sender: user._id,
      text: newmessage,
      chatId: currentChat._id,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/students/messages",
        message
      );
      setMessages([...messages, res.data]);
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
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search Recruiter..."
              className="chatMenuInput"
            />

            {conversations
              ? conversations.map((c) => {
                  return (
                    <div onClick={() => setCurrentChat(c)}>
                      <Conversation conversation={c} currentUser={user} />
                    </div>
                  );
                })
              : "loading"}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {messages.length > 0 || currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages ? (
                    <>
                      {messages.map((message) => {
                        return (
                          <div ref={scrollRef}>
                            <Message
                              message={message}
                              own={message.sender === user._id}
                              key={message._id}
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
                    value={newmessage}
                  ></textarea>

                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMessenger;
