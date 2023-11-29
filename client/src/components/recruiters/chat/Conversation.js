// RecruiterConversation.js
import "./Conversation.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminId = conversation.members.find((m) => m !== currentUser._id);

    const getAdmin = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/admins/getAdminById/${adminId}`
        );
        setAdmin(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAdmin();
  }, [currentUser, conversation]);

  return (
    <div className="recruiterConversation">
      <img
        className="recruiterConversationImage"
        src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
        alt="recruiterConversationImage"
      />
      <p className="recruiterConversationName">
        {admin ? admin.username : "Loading..."}
      </p>
    </div>
  );
};

export default Conversation;
