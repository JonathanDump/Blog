import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PostList from "./Pages/PostList/PostList";
import Post, { loader as postLoader } from "./Pages/Post/Post";
import AdminLogInForm from "./Components/AdminLogInform/AdminLogInForm";
import AdminPostList, {
  loader as adminPostsLoader,
} from "./Pages/AdminPostList/AdminPostList";
import PostForm from "./Components/PostForm/PostForm";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <PostList /> },
        { path: "/:id", element: <Post />, loader: postLoader },
        { path: "/admin/log-in", element: <AdminLogInForm /> },
        {
          path: "/admin/posts",
          element: <AdminPostList />,
          loader: adminPostsLoader,
        },
        {
          path: "/admin/posts/create-post",
          element: <PostForm method="POST" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
