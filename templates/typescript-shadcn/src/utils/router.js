import { createBrowserRouter } from "react-router";
import Dashboard from "../components/admin/Dashboard";
import AdminLayout from "../Layouts/AdminLayout";
import AdminNotFound from "../components/admin/AdminNotFound";
import MainLayout from "../Layouts/MainLayout";
import Home from "../components/main/Home";
import MainNotFound from "../components/main/MainNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "*", Component: MainNotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "*", Component: AdminNotFound },
    ],
  },
]);
