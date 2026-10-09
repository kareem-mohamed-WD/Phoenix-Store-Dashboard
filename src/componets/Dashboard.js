function Dashboard() {
  let clients = JSON.parse(localStorage.getItem("clients")) || [];
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // آخر 8 منتجات مضافة
  let Finally = products.slice(-8).reverse();

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
              $
              {products
                .reduce((total, item) => total + Number(item.price), 0)
                .toLocaleString()}
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

      {/* Latest Products */}
      <div className="recent-inventory">
        {/* Header */}
        <div className="recent-inventory__header">
          <div className="recent-inventory__heading">
            <div className="recent-inventory__title-icon">
              <i className="fa-solid fa-boxes-stacked"></i>
            </div>

            <div>
              <h2>أحدث المنتجات</h2>
              <p>آخر المنتجات المضافة إلى المتجر</p>
            </div>
          </div>

          <span className="recent-inventory__count">
            <i className="fa-solid fa-box"></i>
            {Finally.length} منتجات
          </span>
        </div>

        {/* Products Table */}
        <div className="recent-inventory__table-wrapper">
          <table className="recent-inventory__table">
            <thead>
              <tr>
                <th>#</th>
                <th>اسم المنتج</th>
                <th>التصنيف</th>
                <th>السعر</th>
                <th>الكمية</th>
                <th>الحالة</th>
              </tr>
            </thead>

            <tbody>
              {Finally.length > 0 ? (
                Finally.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <span className="recent-inventory__number">
                        {index + 1}
                      </span>
                    </td>

                    <td>
                      <div className="recent-inventory__product">
                        <div className="recent-inventory__product-icon">
                          <i className="fa-solid fa-box"></i>
                        </div>

                        <span className="recent-inventory__product-name">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="recent-inventory__category">
                        {item.category === "electronics"
                          ? "إلكترونيات"
                          : item.category === "fashion"
                            ? "ملابس"
                            : item.category}
                      </span>
                    </td>

                    <td>
                      <span className="recent-inventory__price">
                        ${Number(item.price || 0).toLocaleString()}
                      </span>
                    </td>

                    <td>
                      <span className="recent-inventory__stock">
                        {item.stock}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`recent-inventory__status ${
                          Number(item.stock) <= 0
                            ? "recent-inventory__status--out"
                            : Number(item.stock) < 10
                              ? "recent-inventory__status--low"
                              : "recent-inventory__status--available"
                        }`}
                      >
                        <span className="recent-inventory__status-dot"></span>

                        {Number(item.stock) <= 0
                          ? "غير متوفر"
                          : Number(item.stock) < 10
                            ? "كمية قليلة"
                            : "متوفر"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className="recent-inventory__empty">
                      <div className="recent-inventory__empty-icon">
                        <i className="fa-solid fa-box-open"></i>
                      </div>

                      <h3>لا توجد منتجات</h3>
                      <p>ستظهر المنتجات المضافة حديثًا هنا.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="recent-inventory__footer">
          <i className="fa-solid fa-circle-info"></i>
          <span>يتم عرض أحدث 8 منتجات تمت إضافتها إلى المتجر.</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
