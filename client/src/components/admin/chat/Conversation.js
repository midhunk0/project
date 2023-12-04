import "./Conversation.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const recruiterId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/recruiters/getRecruiterById/${recruiterId}`
        );
        console.log(recruiterId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        className="conversationImage"
        src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
        alt="conversationImage"
      />
      <p className="conversationName">
        {user ? user.companyName : "Loading..."}
      </p>
    </div>
  );
};

export default Conversation;
