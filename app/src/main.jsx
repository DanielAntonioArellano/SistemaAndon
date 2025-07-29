import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Sidebar from './Components/Shared/Sidebar.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/sidebar',
    element: <Sidebar />
  }
])
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>  )