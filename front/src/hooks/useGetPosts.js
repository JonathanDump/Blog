import React, { useEffect, useState } from "react";

export function useGetPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      const API_URL = import.meta.env.VITE_API_ENDPOINT;
      try {
        const response = await fetch(API_URL);

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
