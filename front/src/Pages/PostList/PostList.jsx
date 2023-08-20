import { Link } from "react-router-dom";
import PostCard from "../../Components/PostCard/PostCard";
import postsCl from "./PostList.module.scss";
import { useGetPosts } from "../../hooks/useGetPosts";
// import { useGetPostsAdmin } from "../../hooks/useGetPostsAdmin";

export default function PostList() {
  const { posts, loading, error } = useGetPosts();

  if (error) {
    return <div className={postsCl.message}>{error.message}</div>;
  }

  if (loading) {
    return <div className={postsCl.message}>Loading posts</div>;
  }
  if (posts.length) {
    return (
      <div className="contentContainer">
        {posts.map((post) => {
          if (post.isVisible) {
            return (
              <Link to={`${post._id}`} key={post._id}>
                <PostCard post={post} />
              </Link>
            );
          }
        })}
      </div>
    );
  }

  return <div className={postsCl.posts}>There are no posts yet</div>;
}
