import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HomeRightbar = ({ user }) => {
  const [lastUsers, setLastUsers] = useState([]);
  const { user: currentUser, URL_API } = useContext(AuthContext);

  // get last users joined
  useEffect(() => {
    const getLastUsers = async () => {
      try {
        const res = await axios.get(URL_API + "/users/lastUsers/");
        const filter = res.data.filter((user) => user._id !== currentUser._id);
        setLastUsers(filter);
      } catch (err) {
        console.log(err);
      }
    };
    getLastUsers();
  }, [user, currentUser._id]);

  return (
    <div>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="assets/gift.png" alt="" />
        <span className="birthdayText">
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </span>
      </div>
      <img className="rightbarAd" src="assets/ad.png" alt="" />
      <h4 className="rightbarTitle">Last Users Joined</h4>
      {lastUsers?.map((lastUser, i) => (
        <div key={i} className="lastUser">
          <Link to={`/profile/${lastUser.username}`}>
            <div className="circleDiv">
              <span>{lastUser.username.substring(0, 1)}</span>
            </div>
            <p>Username : {lastUser.username}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomeRightbar;
