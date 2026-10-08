function Navbar({ setPage }) {
  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <h2>
              Phoenix <span>Store</span>
            </h2>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            <img src="img/IMG-20260323-WA0006.jpg" alt="" />
          </div>
          <h3>المدير العام</h3>

          <div className="user-role">
            <p>Admin</p>
            <span className="online"></span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <button className="dashboard" onClick={() => setPage("dashboard")}>
            <i className="fa-solid fa-chart-line"></i>
            Dashboard
          </button>

          <button className="products" onClick={() => setPage("products")}>
            <i className="fa-solid fa-box"></i>
            Products
          </button>

          <button className="clients" onClick={() => setPage("clients")}>
            <i className="fa-solid fa-users"></i>
            Clients
          </button>

          <button className="employees" onClick={() => setPage("employees")}>
            <i className="fa-solid fa-user-tie"></i>
            Employees
          </button>

          <button className="settings" onClick={() => setPage("settings")}>
            <i className="fa-solid fa-gear"></i>
            Settings
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Navbar;
