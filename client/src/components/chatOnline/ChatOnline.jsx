import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./chatOnline.css";

export default function ChatOnline({
  onlineUsers,
  currentId,
  setCurrentChat,
  currentChat,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { URL_API } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(URL_API + "/users/friends/" + currentId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        URL_API + `/conversations/find/${currentId}/${user._id}`
      );
      if (res.data !== null) {
        setCurrentChat(res.data);
      } else {
        const res = await axios.post(URL_API + "/conversations", {
          senderId: currentId,
          receiverId: user._id,
        });
        setCurrentChat(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      <h4 className="title">Your Friends</h4>
      {friends.map((f, i) => (
        <div
          className="chatOnlineFriend"
          key={i}
          onClick={() => handleClick(f)}
        >
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={PF + "/employee.png"} alt="" />
          </div>
          <span className="chatOnlineName">{f?.username}</span>
        </div>
      ))}
    </div>
  );
}
