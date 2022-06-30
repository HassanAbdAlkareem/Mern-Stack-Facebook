import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Register from "../register/Register";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const { editProfile } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  console.log(PF);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={PF + "/backgroundDark.jpg"}
                alt=""
              />
              <div className="circleDiv">
                <span>{username.substring(0, 1)}</span>
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.bio}</span>
            </div>
          </div>
          <div style={editProfile ? { display: "block" } : { display: "flex" }}>
            {editProfile ? (
              <Register />
            ) : (
              <>
                <Feed username={username} />
                <Rightbar user={user} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
