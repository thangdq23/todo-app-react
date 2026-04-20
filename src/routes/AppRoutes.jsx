import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../page/auth/Register";
import Login from "../page/auth/Login";
import LandingPage from "../page/landingPage/LandingPage";
import Dashboard from "../page/dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../components/layout/client/MainLayout";
import AdminLayout from "../components/layout/admin/AdminLayout";
import Tasks from "../page/tasks/Tasks";
import Calendar from "../page/calendar/Calendar";
import Setting from "../page/settings/Setting";
import Projects from "../page/project/Project";
import ProjectDetails from "../page/project/ProjectDetails";

const routes = createBrowserRouter([
  // client
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },

  // admin
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "task",
        element: <Tasks />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:projectId",
        element: <ProjectDetails />,
      },
    ],
  },

  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <h1>404 - Not Found</h1> },
]);
const AppRoutes = () => {
  return <RouterProvider router={routes}></RouterProvider>;
};

export default AppRoutes;
