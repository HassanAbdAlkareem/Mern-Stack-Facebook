import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./conversation.css";

export default function Conversation({ conversation, currentUser, i }) {
  const [user, setUser] = useState(null);
  const { URL_API } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(URL_API + "/users?userId=" + friendId);
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <>
      <h4 className="title">Conversation {i + 1}</h4>
      <div className="conversation">
        <img className="conversationImg" src={PF + "/employee.png"} alt="" />
        <span className="conversationName">{user?.username}</span>
      </div>
    </>
  );
}
