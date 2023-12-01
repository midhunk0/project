import React, { useEffect, useState } from "react";
import "./message.css";

const Message = ({ message, own }) => {
  const [timeAgo, setTimeAgo] = useState(null);

  useEffect(() => {
    const calculateTimeAgo = (timestamp) => {
      const currentTime = new Date();
      const messageTime = new Date(timestamp);
      const timeDifference = currentTime - messageTime;
      const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
      return hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;
    };

    setTimeAgo(calculateTimeAgo(message.createdAt));

    // Update the time every minute to keep it accurate
    const interval = setInterval(() => {
      setTimeAgo(calculateTimeAgo(message.createdAt));
    }, 60000);

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
