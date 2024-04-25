import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import "./index.css";
import Index from "./routs/index.jsx";
import Category from "./routs/category.jsx";
import CategoryPage, {
  loader as categoryPageLoader,
} from "./routs/categoryPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Article, { loader as articleLoader } from "./routs/article.jsx";
import Articles from "./routs/articles.jsx";
import Register from "./routs/register.jsx";
import Login from "./routs/login.jsx";
import ContextProvider from "./context/provider.jsx";
import Search from "./routs/Search.jsx";
import Logout from "./routs/logout.jsx";
import ApplyPublisher from "./routs/applyPublisher.jsx";
import Dashboard from "./routs/dashboard.jsx";
import AddArticle from "./routs/addArticle.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "category", element: <Category /> },
      {
        path: "category/:category",
        element: <CategoryPage />,
        loader: categoryPageLoader,
      },
      { path: "article", element: <Articles /> },
      { path: "article/:Id", element: <Article />, loader: articleLoader },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "search", element: <Search /> },
      { path: "logout", element: <Logout /> },
      { path: "apply-publisher", element: <ApplyPublisher /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "add-article", element: <AddArticle /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
