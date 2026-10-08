function Dashboard() {
  let clients = JSON.parse(localStorage.getItem("clients")) || [];
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>نظرة عامة على المتجر</p>
      </div>

      {/* Statistics */}
      <div className="dashboard-cards">
        {/* Total Clients */}
        <div className="dashboard-card clients-card">
          <div className="dashboard-icon clients-icon">
            <i className="fa-solid fa-users"></i>
          </div>

          <div className="dashboard-info">
            <h3>إجمالي العملاء</h3>
            <p>Total Clients</p>
            <strong>{clients.length}</strong>
          </div>
        </div>

        {/* Total Employees */}
        <div className="dashboard-card employees-card">
          <div className="dashboard-icon employees-icon">
            <i className="fa-solid fa-user-tie"></i>
          </div>

          <div className="dashboard-info">
            <h3>إجمالي الموظفين</h3>
            <p>Total Employees</p>
            <strong>{employees.length}</strong>
          </div>
        </div>

        {/* Total Products */}
        <div className="dashboard-card products-card">
          <div className="dashboard-icon products-icon">
            <i className="fa-solid fa-box"></i>
          </div>

          <div className="dashboard-info">
            <h3>إجمالي المنتجات</h3>
            <p>Total Products</p>
            <strong>{products.length}</strong>
          </div>
        </div>

        {/* Products Value */}
        <div className="dashboard-card value-card">
          <div className="dashboard-icon value-icon">
            <i className="fa-solid fa-money-bill-wave"></i>
          </div>

          <div className="dashboard-info">
            <h3>قيمة المنتجات</h3>
            <p>Products Value</p>

            <strong>
              ${products.reduce((total, item) => total + Number(item.price,0), 0)}
            </strong>
          </div>
        </div>

        {/* Active Clients */}
        <div className="dashboard-card active-card">
          <div className="dashboard-icon active-icon">
            <i className="fa-solid fa-user-check"></i>
          </div>

          <div className="dashboard-info">
            <h3>العملاء النشطين</h3>
            <p>Active Clients</p>

            <strong>
              {clients.filter((client) => client?.status === "Active").length}
            </strong>
          </div>
        </div>

        {/* Inactive Clients */}
        <div className="dashboard-card inactive-card">
          <div className="dashboard-icon inactive-icon">
            <i className="fa-solid fa-user-xmark"></i>
          </div>

          <div className="dashboard-info">
            <h3>العملاء غير النشطين</h3>
            <p>Inactive Clients</p>

            <strong>
              {clients.filter((client) => client?.status === "Inactive").length}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
