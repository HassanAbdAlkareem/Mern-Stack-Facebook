import "./rightbar.css";
import React, { useContext } from "react";
import ProfileRightbar from "./ProfileRightbar";
import HomeRightbar from "./HomeRightbar";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const { user: currentUser } = useContext(AuthContext);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? (
          <ProfileRightbar user={user} currentUser={currentUser} />
        ) : (
          <HomeRightbar user={user} />
        )}
      </div>
    </div>
  );
}
