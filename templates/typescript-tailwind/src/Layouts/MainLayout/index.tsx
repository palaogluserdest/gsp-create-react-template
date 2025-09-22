import "./MainLayout.scss";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header className="main-header">
        <h1>Main Layout</h1>
      </header>
      <main className="main-content">{/* Main content goes here */}</main>
      <footer className="main-footer">
        <p>Footer content</p>
      </footer>
    </div>
  );
};

export default MainLayout;
