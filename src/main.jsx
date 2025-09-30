import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './Body'
import Profile from './Profile'
import Login from './Login'
import './index.css'

// Define routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>,
)
