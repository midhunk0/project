// // RecruiterMessage.js
// import React, { useEffect, useState } from "react";
// import "./Message.css";

// const Message = ({ message, own }) => {
//   const [timeAgo, setTimeAgo] = useState(null);

//   useEffect(() => {

//   });

//   return (
//     <div className={own ? "recruiterMessage own" : "recruiterMessage"}>
//       <div className="recruiterMessageTop">
//         <img
//           className="recruiterMessageImg"
//           src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
//           alt=""
//         />
//         <p className="recruiterMessageText">{message.text}</p>
//       </div>
//       <div className="recruiterMessageBottom">{timeAgo}</div>
//     </div>
//   );
// };

// export default Message;

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
    <div className={own ? "recruiterMessage own" : "recruiterMessage"}>
      <div className="recruiterMessageTop">
        <img
          className="recruiterMessageImg"
          src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
          alt=""
        />
        <p className="recruiterMessageText">{message.text}</p>
      </div>
      <div className="recruiterMessageBottom">{timeAgo}</div>
    </div>
  );
};

export default Message;
