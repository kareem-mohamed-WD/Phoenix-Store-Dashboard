import { useState } from "react";

function Sales() {
  // جلب الطلبات من LocalStorage
  const [getOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  // الطلبات المكتملة فقط
  const completedOrders = getOrders.filter(
    (order) => order.status === "completed",
  );

  // أكبر طلب من حيث الكمية
  const maxOrder = Math.max(...completedOrders.map((order) => order.quantity));
  const mostOrderedProduct = completedOrders.filter(
    (order) => order.quantity === maxOrder,
  );

  // إجمالي المبيعات
  const totalSales = completedOrders.reduce(
    (total, order) => total + Number(order.total || 0),
    0,
  );

  // عدد الطلبات المكتملة
  const totalOrders = completedOrders.length;

  // إجمالي المنتجات المباعة
  const totalProducts = completedOrders.reduce(
    (total, order) => total + Number(order.quantity || 0),
    0,
  );

  // تنسيق الأسعار بالجنيه المصري
  const formatPrice = (price) => {
    return `${price.toLocaleString("en-US")} $`;
  };

  return (
    <section className="sales-page">
      <h2>المبيعات</h2>
      <p>ملخص المبيعات والطلبات المكتملة في المتجر.</p>

      {/* إحصائيات المبيعات */}
      <div className="sales-stats">
        <div className="sales-card">
          <h3>إجمالي المبيعات</h3>
          <p>{formatPrice(totalSales)}</p>
        </div>

        <div className="sales-card">
          <h3>الطلبات المكتملة</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="sales-card">
          <h3>المنتجات المباعة</h3>
          <p>{totalProducts}</p>
        </div>
      </div>
      <div className="sales-card">
        <h3>أكثر منتج مبيعًا</h3>

        {mostOrderedProduct.length > 0 ? (
          mostOrderedProduct.map((order) => (
            <div key={order.id}>
              <p>اسم المنتج: {order.productName}</p>
              <p>الكمية المطلوبة: {order.quantity} قطعة</p>
            </div>
          ))
        ) : (
          <p>مفيش مبيعات لحد دلوقتي.</p>
        )}
      </div>

      {/* جدول المبيعات */}
      <div className="sales-table-container">
        <h3>سجل المبيعات</h3>

        {completedOrders.length === 0 ? (
          <p>مفيش مبيعات مكتملة لحد دلوقتي.</p>
        ) : (
          <table className="sales-table">
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>العميل</th>
                <th>المنتج</th>
                <th>السعر</th>
                <th>الكمية</th>
                <th>الإجمالي</th>
                <th>التاريخ</th>
                <th>الحالة</th>
              </tr>
            </thead>

            <tbody>
              {completedOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>

                  <td>{order.customerName}</td>

                  <td>{order.productName}</td>

                  <td>{formatPrice(Number(order.price || 0))}</td>

                  <td>{order.quantity}</td>

                  <td>{formatPrice(Number(order.total || 0))}</td>

                  <td>{order.date}</td>

                  <td>
                    <span className="sales-status">مكتمل</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default Sales;
