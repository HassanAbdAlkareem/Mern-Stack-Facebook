import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const URL_API = "http://localhost:5000/api";
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [editProfile, setEditProfile] = useState(false);
  const [searchUser, setSearchUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    bio: "",
    birthday: "",
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        URL_API,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        editProfile,
        setEditProfile,
        userInfo,
        setUserInfo,
        searchUser,
        setSearchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
