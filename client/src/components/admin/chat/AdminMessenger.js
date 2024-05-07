/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useContext, useState, useEffect, useRef } from "react";
import "./AdminMessenger.css";
import Conversation from "./Conversation";
import Message from "./Message.js";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../../../Url.js"

const AdminMessenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [unreadMessageCounts, setUnreadMessageCounts] = useState({});
  const [recruiters, setRecruiters] = useState([]);
  const scrollRef = useRef();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getRecruiters = async () => {
      try {
        const res = await axios.get(
          `http://${baseUrl}/api/recruiters/getAllRecruiters`
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
          `http://${baseUrl}/api/students/conversations/${user._id}`
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
            `http://${baseUrl}/api/students/messages/${currentChat._id}`
          );
          setMessages(res.data);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleConversationClick = async (conversation) => {
    setCurrentChat(conversation);
    // Call your function to mark message as read
    await markMessagesAsRead(conversation._id);
  };

  const markMessagesAsRead = async (conversationId) => {
    try {
      const res = await axios.patch(
        `http://${baseUrl}/api/students/messages/markAsRead/${conversationId}`
      );
      // Handle success response if needed
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      chatId: currentChat._id,
    };

    try {
      const res = await axios.post(
        `http://${baseUrl}/api/students/messages`,
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

  const fetchUnreadMessageCount = async (conversationId) => {
    try {
      const res = await axios.get(
        `http://${baseUrl}/api/students/unreadMessages/${conversationId}`
      );

      if (
        res.data &&
        res.data.unreadCounts &&
        res.data.unreadCounts[conversationId] !== undefined
      ) {
        setUnreadMessageCounts((prevCounts) => ({
          ...prevCounts,
          [conversationId]: res.data.unreadCounts[conversationId],
        }));
      } else {
        console.log("Invalid API response for unread message count");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchAllUnreadCounts = async () => {
      for (const conversation of conversations) {
        await fetchUnreadMessageCount(conversation._id);
      }
    };
    fetchAllUnreadCounts();
  }, [conversations]);

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
              ? conversations.map((c) => (
                  <div onClick={() => handleConversationClick(c)}>
                    <Conversation
                      conversation={c}
                      currentUser={user}
                      unreadMessageCount={unreadMessageCounts[c._id]}
                    />
                  </div>
                ))
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
                      {messages.map((message) => (
                        <div ref={scrollRef} key={message._id}>
                          <Message
                            message={message}
                            own={message.sender === user._id}
                          />
                        </div>
                      ))}
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
