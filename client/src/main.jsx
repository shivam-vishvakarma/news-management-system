import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import './index.css'
import Index from './routs/index.jsx'
import Category from './routs/category.jsx'
import Articles from './routs/articles.jsx'
import { createBrowserRouter,RouterProvider   } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      { index: true, element: <Index />},
      { path: 'category', element: <Category />},
      { path: 'articles', element: <Articles />}


    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
