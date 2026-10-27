
import { useState } from "react";

function Navbar({ setPage }) {
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  // تغيير الصفحة وإغلاق السايدبار
  function handleNavigation(page) {
    setPage(page);
    setActivePage(page);
    setOpen(false);
  }

  return (
    <>
      {/* زرار فتح السايدبار */}
      {!open && (
        <button
          className="menu-toggle"
          onClick={() => setOpen(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      )}

      {/* الطبقة الشفافة */}
      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* السايدبار */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-top">
          <button
            className="menu-close"
            onClick={() => setOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="sidebar-logo">
            <h2>
              Phoenix <span>Store</span>
            </h2>
          </div>
        </div>

        {/* بيانات المدير */}
        <div className="sidebar-user">
          <div className="user-avatar">
            <img
              src="img/IMG-20260323-WA0006.jpg"
              alt="Admin"
            />
          </div>

          <h3>المدير العام</h3>

          <div className="user-role">
            <p>Admin</p>
            <span className="online"></span>
          </div>
        </div>

        {/* قائمة التنقل */}
        <nav className="sidebar-menu">
          <button
            className={`dashboard ${
              activePage === "dashboard" ? "active" : ""
            }`}
            onClick={() => handleNavigation("dashboard")}
          >
            <i className="fa-solid fa-house"></i>
            Dashboard
          </button>

          <button
            className={`sales ${
              activePage === "sales" ? "active" : ""
            }`}
            onClick={() => handleNavigation("sales")}
          >
            <i className="fa-solid fa-chart-pie"></i>
            Sales Analytics
          </button>

          <button
            className={`products ${
              activePage === "products" ? "active" : ""
            }`}
            onClick={() => handleNavigation("products")}
          >
            <i className="fa-solid fa-box-open"></i>
            Products
          </button>

          <button
            className={`orders ${
              activePage === "orders" ? "active" : ""
            }`}
            onClick={() => handleNavigation("orders")}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            Orders
          </button>

          <button
            className={`clients ${
              activePage === "clients" ? "active" : ""
            }`}
            onClick={() => handleNavigation("clients")}
          >
            <i className="fa-solid fa-user-group"></i>
            Customers
          </button>

          <button
            className={`employees ${
              activePage === "employees" ? "active" : ""
            }`}
            onClick={() => handleNavigation("employees")}
          >
            <i className="fa-solid fa-user-tie"></i>
            Employees
          </button>

          <button
            className={`settings ${
              activePage === "settings" ? "active" : ""
            }`}
            onClick={() => handleNavigation("settings")}
          >
            <i className="fa-solid fa-sliders"></i>
            Settings
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Navbar;
