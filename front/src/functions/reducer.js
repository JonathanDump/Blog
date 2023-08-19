export async function reducer(result, action) {
  const jwt = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_ENDPOINT;
  switch (action.type) {
    case "update": {
      action.navigate(`/admin/posts/${action.id}/update`);
    }

    case "delete": {
      await fetch(`${API_URL}/admin/posts/${action.id}`, {
        method: "DELETE",
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
      });
      action.navigate("/admin/posts");
    }
  }
}
