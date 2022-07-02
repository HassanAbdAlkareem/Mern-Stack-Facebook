import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove, Edit } from "@material-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfileRightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {
    user: currentUser,
    setEditProfile,
    setUserInfo,
    URL_API,
  } = useContext(AuthContext);
  const [followed, setFollowed] = useState(null);

  useEffect(() => {
    if (currentUser.friends.includes(user._id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [user]);

  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const friendList = await axios.get(
  //         URL_API + "/users/friends/" + user?._id
  //       );
  //       setFriends(friendList.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getFriends();
  // }, [user, URL_API]);

  const FollowAndUnFollowClick = async () => {
    try {
      if (followed) {
        const res = await axios.put(`${URL_API}/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
      } else {
        const res = await axios.put(`${URL_API}/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
      }
    } catch (err) {}
  };

  return (
    <React.Fragment>
      {user.username !== currentUser.username && (
        <button
          className="rightbarFollowButton"
          onClick={FollowAndUnFollowClick}
        >
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <div className="userInfo">
        <h4 className="rightbarTitle">User information</h4>
        <span
          style={{ cursor: "pointer" }}
          onClick={
            (() => () => setEditProfile(true), () => setUserInfo(currentUser))
          }
        >
          {user.username === currentUser.username && <Edit className="edit" />}
        </span>
      </div>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Country:</span>
          <span className="rightbarInfoValue">{user.country}</span>
        </div>

        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City: </span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>

        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Birthday:</span>
          <span className="rightbarInfoValue">{user.birthday}</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        {friends.map((friend) => (
          <Link
            to={"/profile/" + friend.username}
            style={{ textDecoration: "none" }}
          >
            <div className="rightbarFollowing">
              <img
                src={PF + "person/noAvatar.png"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProfileRightbar;
