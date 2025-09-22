import { Outlet } from "react-router";
import "./AdminLayout.scss";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Afet Yönetim Sistemi Admin Dashboard</h1>
      </header>
      <main className="admin-main">
        <Outlet />
      </main>
      <footer className="admin-footer">
        <p>&copy; 2025 Afet Yönetim Sistemi Admin Panel</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
