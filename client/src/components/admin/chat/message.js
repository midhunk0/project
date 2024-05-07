import React, { useEffect, useState } from "react";
import "./Message.css";

const Message = ({ message, own }) => {
  const [timeAgo, setTimeAgo] = useState(null);

  useEffect(() => {
    // Define the interval variable
    const interval = setInterval(() => {
      setTimeAgo(calculateTimeAgo(message.createdAt));
    }, 60000);

    // Define the calculateTimeAgo function
    const calculateTimeAgo = (timestamp) => {
      const messageTime = new Date(timestamp);
      return messageTime.toLocaleString(); // Use toLocaleString to format date and time
    };

    setTimeAgo(calculateTimeAgo(message.createdAt));

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [message.createdAt]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{timeAgo}</div>
    </div>
  );
};

export default Message;
