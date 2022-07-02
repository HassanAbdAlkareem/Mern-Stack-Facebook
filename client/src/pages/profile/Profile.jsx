import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Register from "../register/Register";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const { editProfile, URL_API } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${URL_API}/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
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
              <Link className="back-home" to={"/"}>
                <ArrowBack className="icon" />
                Home
              </Link>
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
