import { useState } from "react";
import {
  Navbar,
  Dashboard,
  Products,
  Clients,
  Employees,
  Settings,
  Orders,
  Sales,
} from "./componets";
function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app">
      <Navbar setPage={setPage} />

      <main className="main-content">
        {page === "dashboard" && <Dashboard />}
        {page === "products" && <Products />}
        {page === "clients" && <Clients />}
        {page === "employees" && <Employees />}
        {page === "settings" && <Settings />}
        {page === "orders" && <Orders />}
        {page === "sales" && <Sales />}
      </main>
    </div>
  );
}

export default App;
