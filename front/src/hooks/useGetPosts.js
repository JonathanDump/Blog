import React, { useEffect, useState } from "react";

export function useGetPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch("http://localhost:3000/");

        if (response.status >= 400) {
          throw new Error("Something went wrong");
        }
        const responseData = await response.json();

        setPosts(responseData.posts);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    }
    getPosts();
  }, []);

  return { posts, loading, error };
}
