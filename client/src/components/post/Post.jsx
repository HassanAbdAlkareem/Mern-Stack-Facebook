import "./post.css";
import { Delete } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import React from "react";

export default function Post({ post, setPosts, posts }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, URL_API } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${URL_API}/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(URL_API + "/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  //
  const deletePost = async (userId) => {
    try {
      await axios.delete(URL_API + "/posts/" + post._id, {
        data: { userId: userId },
      });
      const filter = posts.filter((p) => p._id !== post._id);
      setPosts(filter);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        {posts.length === 0 ? (
          <span>No Posts Yet</span>
        ) : (
          <React.Fragment>
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user.username}`}>
                  <img
                    className="postProfileImg"
                    src={PF + "/employee.png"}
                    alt=""
                  />
                </Link>
                <span className="postUsername">{user.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
            </div>
            <div className="postCenter">
              <span className="postText">{post?.desc}</span>
              <img className="postImg" src={PF + post.img} alt="" />
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  className="likeIcon"
                  src={`${PF}/like.png`}
                  onClick={likeHandler}
                  alt=""
                />
                <img
                  className="likeIcon"
                  src={`${PF}/heart.png`}
                  onClick={likeHandler}
                  alt=""
                />
                <span className="postLikeCounter">{like} people like it</span>
              </div>
              <div className="postBottomRight">
                <span
                  className="postCommentText"
                  onClick={() => deletePost(post.userId)}
                >
                  {user.username === currentUser.username && <Delete />}
                </span>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
