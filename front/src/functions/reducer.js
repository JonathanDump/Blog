export async function reducer(result, action) {
  const jwt = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_ENDPOINT;
  switch (action.type) {
    case "update": {
      const response = await fetch(`${API_URL}/admin/${action.id}`, {
        method: "PUT",
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
      });
    }

    case "delete": {
    }
  }
}
