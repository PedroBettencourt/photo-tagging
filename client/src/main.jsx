import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link, Outlet } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Leaderboard from "./Leaderboard.jsx";

function Layout() {
  return(
    <>
      <nav>
        <Link to="/">Click the proverb</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
      <Outlet />
    </>
  )
}

function ErrorPage() {
  return (
    <>
      <h1>This page does not exist</h1>
      <Link to="/">Back to home</Link>
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />
      },
    ]
  }, 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
