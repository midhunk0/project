import "./Conversation.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Conversation = ({ conversation, currentUser, unreadMessageCount }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const recruiterId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/recruiters/getRecruiterById/${recruiterId}`
        );

        if (res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  if (isLoading || !user) {
    // Hide the conversation component if loading or user not found
    return null;
  }

  return (
    <div className="conversation">
      <img
        className="conversationImage"
        src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
        alt="conversationImage"
      />
      <div className="conversationDetails">
        <p className="conversationName">{user.companyName}</p>
        {unreadMessageCount > 0 && <span className="unreadCount">{unreadMessageCount}</span>}
      </div>
    </div>
  );
};

export default Conversation;
