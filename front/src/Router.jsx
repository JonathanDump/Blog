import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Posts from "./Pages/Posts/Posts";
import Post, { loader as postLoader } from "./Pages/Post/Post";
import AdminLogInForm from "./Components/AdminLogInform/AdminLogInForm";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Posts /> },
        { path: "/:id", element: <Post />, loader: postLoader },
        { path: "/admin/log-in", element: <AdminLogInForm /> },
        { path: "/admin/posts", element: <Posts /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
