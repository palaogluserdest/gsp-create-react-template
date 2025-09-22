import { createBrowserRouter } from "react-router";
import Dashboard from "../components/admin/Dashboard";
import AdminLayout from "../Layouts/AdminLayout";
import AdminNotFound from "../components/admin/AdminNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "*", Component: AdminNotFound },
    ],
  },
]);
