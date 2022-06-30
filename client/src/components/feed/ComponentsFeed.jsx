import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";

const ComponentsFeed = ({ username }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  //
  return (
    <div className="components-feed">
      {(!username || username === user.username) && <Share />}
      {posts.length <= 0 ? (
        <p className="noPostsYet">No Posts Yet ...</p>
      ) : (
        posts.map((p) => (
          <Post key={p._id} posts={posts} post={p} setPosts={setPosts} />
        ))
      )}
    </div>
  );
};

export default ComponentsFeed;
