import "./closeFriend.css";

export default function CloseFriend({ followers }) {
  return (
    <li className="sidebarFriend">
      <span className="sidebarFriendName">{followers.username}</span>
    </li>
  );
}
