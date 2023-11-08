import React from "react";
import "./AdminMessenger.css";
import Conversation from "./Conversation";
import Message from "./message";

const AdminMessenger = () => {
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search Recruiter..."
              className="chatMenuInput"
            />
            <Conversation />
            <Conversation />
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea className="chatMessageInput" placeholder="write something..."></textarea>
              <button class="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMessenger;
