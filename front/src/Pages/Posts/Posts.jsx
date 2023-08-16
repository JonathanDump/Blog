import { Link } from "react-router-dom";
import Post from "../../Components/PostCard/PostCard";
import postsCl from "./Posts.module.scss";
import { useGetPosts } from "../../hooks/useGetPosts";

export default function Posts() {
  const { posts, loading, error } = useGetPosts();

  if (error) {
    return <div className={postsCl.message}>{error.message}</div>;
  }

  if (loading) {
    return <div className={postsCl.message}>Loading posts</div>;
  }
  if (posts.length) {
    return (
      <div className={postsCl.posts}>
        {posts.map((post) => {
          if (post.isVisible) {
            return (
              <Link to={`${post._id}`} key={post._id}>
                <Post post={post} />
              </Link>
            );
          }
        })}
      </div>
    );
  }

  return <div className={postsCl.posts}>There are no posts yet</div>;
}
