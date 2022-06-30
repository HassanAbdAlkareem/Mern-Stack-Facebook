import "./SearchUser.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

//
export const SearchUser = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { searchUser, setSearchUser } = useContext(AuthContext);
  const [userFound, setUserFound] = useState(null);

  useEffect(() => {
    const serachinUser = async () => {
      if (searchUser !== null) {
        const res = await axios.get(
          `/users?username=${searchUser.toLowerCase()}`
        );
        setUserFound(res.data);
      }
    };
    serachinUser();
  }, [searchUser]);

  return (
    <div className="search">
      {userFound ? (
        <Link
          to={`/profile/${userFound?.username}`}
          onClick={() => setSearchUser(null)}
        >
          <div className="infoUserFound">
            <div className="circleDiv">
              <span>{userFound.username.substring(0, 1)}</span>
            </div>
            <span>Username : {userFound?.username}</span>
          </div>
          <span className="bio">- {userFound.bio}</span>
        </Link>
      ) : (
        <span>User Not Found ...</span>
      )}
    </div>
  );
};
