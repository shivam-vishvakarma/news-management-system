import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout.jsx';
import './index.css';
import Index from './routs/index.jsx';
import Category, { loader as categoryLoader} from './routs/category.jsx';
import CategoryPage, { loader as categoryPageLoader} from './routs/categoryPage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { loader as indexLoader } from './routs/index.jsx';
import Article, { loader as articleLoader} from './routs/article.jsx';
import Articles, { loader as articlesLoader} from './routs/articles.jsx';
import Register from './routs/register.jsx';
import Login from './routs/login.jsx';
import ContextProvider from './context/provider.jsx';
import Search,{ loader as searchLoader} from './routs/Search.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      { index: true, element: <Index />, loader: indexLoader},
      { path: 'category', element: <Category />, loader: categoryLoader},
      { path: 'category/:category', element: <CategoryPage />, loader: categoryPageLoader},
      { path: 'article', element: <Articles />, loader: articlesLoader},
      { path: 'article/:Id', element: <Article />, loader: articleLoader},
      { path: 'register', element: <Register />},
      { path: 'login', element: <Login />},
      { path: 'search', element: <Search />, loader: searchLoader},
    ]
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
