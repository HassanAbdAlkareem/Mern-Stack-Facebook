import "./feed.css";
import { useContext } from "react";
import { SearchUser } from "../searchForUser/SearchUser";
import { AuthContext } from "../../context/AuthContext";
import ComponentsFeed from "./ComponentsFeed";

export default function Feed({ username }) {
  const { searchUser } = useContext(AuthContext);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {searchUser ? <SearchUser /> : <ComponentsFeed username={username} />}
      </div>
    </div>
  );
}
