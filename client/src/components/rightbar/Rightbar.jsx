import "./rightbar.css";
import React from "react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove, Edit } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [lastUsers, setLastUsers] = useState([]);
  const {
    user: currentUser,
    dispatch,
    setEditProfile,
    setUserInfo,
  } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const friendList = await axios.get("/users/friends/" + user?._id);
  //       setFriends(friendList.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getFriends();
  // }, [user]);

  // get last users joined
  useEffect(() => {
    const getLastUsers = async () => {
      try {
        const res = await axios.get("/users/lastUsers/");
        const filter = res.data.filter((user) => user._id !== currentUser._id);
        setLastUsers(filter);
      } catch (err) {
        console.log(err);
      }
    };
    getLastUsers();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  //

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Last Users Joined</h4>
        {lastUsers?.map((lastUser) => (
          <div className="lastUser">
            <Link to={`/profile/${lastUser?.username}`}>
              <div className="circleDiv">
                <span>{lastUser.username.substring(0, 1)}</span>
              </div>
              <p>Username : {lastUser?.username}</p>
            </Link>
          </div>
        ))}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <React.Fragment>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <div className="userInfo">
          <h4 className="rightbarTitle">User information</h4>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => (setEditProfile(true), setUserInfo(currentUser))}
          >
            {user.username === currentUser.username && (
              <Edit className="edit" />
            )}
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
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
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
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
