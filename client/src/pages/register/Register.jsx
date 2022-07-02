import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const { setEditProfile, editProfile, userInfo, setUserInfo, user, URL_API } =
    useContext(AuthContext);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (editProfile) {
        const res = await axios.put(URL_API + "/users/" + user._id, {
          ...userInfo,
          userId: user._id,
        });

        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
      } else {
        await axios.post(URL_API + "/auth/register", userInfo);
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="login"
      style={editProfile ? { height: "100%" } : { height: "100vh" }}
    >
      <div
        className="loginWrapper"
        style={editProfile ? { padding: "0" } : { padding: "50px" }}
      >
        <div className="loginLeft">
          <h3 className="loginLogo">
            {editProfile ? "Update Profile" : "Connecting People"}
          </h3>
          {!editProfile && (
            <span className="loginDesc">
              Connect with friends and the world around you on Lamasocial.
            </span>
          )}
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            {!editProfile && (
              <>
                <input
                  placeholder="Username"
                  required
                  name={"username"}
                  className="loginInput"
                  value={userInfo.username}
                  onChange={handleChange}
                  maxLength="10"
                />

                <input
                  placeholder="Email"
                  required
                  name={"email"}
                  className="loginInput"
                  type="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  maxLength="50"
                />
              </>
            )}
            {!editProfile && (
              <input
                placeholder="Password"
                required
                name={"password"}
                className="loginInput"
                type="password"
                minLength="6"
                value={userInfo.password}
                onChange={handleChange}
              />
            )}
            <input
              placeholder="Bio & Description"
              name={"bio"}
              className="loginInput"
              type="text"
              value={userInfo.bio}
              onChange={handleChange}
              maxLength="100"
            />
            <input
              placeholder="Birthday"
              name={"birthday"}
              className="loginInput"
              type="date"
              value={userInfo.birthday}
              onChange={handleChange}
            />
            <div className="wrapper-address">
              <input
                placeholder="Country"
                name={"country"}
                className="loginInput"
                type="text"
                value={userInfo.country}
                onChange={handleChange}
                maxLength="20"
              />
              <input
                placeholder="City"
                name={"city"}
                className="loginInput"
                type="text"
                value={userInfo.city}
                onChange={handleChange}
                maxLength="20"
              />
            </div>

            <button className="loginButton" type="submit">
              {editProfile ? "Updated" : "Register"}
            </button>
            {editProfile ? (
              <span
                onClick={() => setEditProfile(false)}
                style={{ cursor: "pointer" }}
              >
                Cansel Update{" "}
              </span>
            ) : (
              <Link to="login" style={{ textAlign: "center" }}>
                <button className="loginRegisterButton">
                  You have account ? login
                </button>
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
