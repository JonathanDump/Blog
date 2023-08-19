import React, { useEffect, useState } from "react";

export function useGetPostsAdmin() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      const jwt = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_ENDPOINT;
      try {
        const response = await fetch(`${API_URL}/admin/posts`, {
          headers: {
            Authorization: jwt,
            "Cache-Control": "no-store",
          },
        });

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
