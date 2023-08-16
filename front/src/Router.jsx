import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Posts from "./Pages/Posts/Posts";
import Post, { loader as postLoader } from "./Pages/Post/Post";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Posts /> },
        { path: "/:id", element: <Post />, loader: postLoader },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
