import { useState } from "react";

function Orders() {
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });

  const [clients] = useState(() => {
    return JSON.parse(localStorage.getItem("clients")) || [];
  });

  const [productID, setProductID] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  const product = products.find((item) => item.id === Number(productID));
  const customer = clients.find((item) => item.id === Number(customerID));

  // إنشاء الطلب
  function handleAddOrder(e) {
    e.preventDefault();

    if (Number(quantity) < 1) {
      alert("الكمية لازم تكون قطعة واحدة على الأقل");
      return;
    }

    if (!product || !customer) {
      alert("اختار المنتج والعميل الأول");
      return;
    }

    if (Number(quantity) > Number(product.stock)) {
      alert("الكمية المطلوبة أكبر من المخزون المتاح");
      return;
    }

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString("ar-EG"),
      customerID: customer.id,
      customerName: customer.name,
      productID: product.id,
      productName: product.name,
      price: Number(product.price),
      quantity: Number(quantity),
      total: Number(product.price) * Number(quantity),
      status: "pending",
    };

    const updatedOrders = [...orders, newOrder];

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setProductID("");
    setCustomerID("");
    setQuantity(1);
    alert("تم إنشاء الطلب بنجاح");
  }
  function updateOrderStatus(orderID, newStatus) {
    const order = orders.find((item) => item.id === orderID);
    // نتأكد إن الطلب موجود ولسه قيد الانتظار
    if (!order || order.status !== "pending") return;

    // لو هنأكد الاستلام، نخصم الكمية من المخزون
    if (newStatus === "completed") {
      const product = products.find((item) => item.id === order.productID);
      if (!product || Number(product.stock) < order.quantity) {
        alert("المخزون غير كافٍ لإتمام الطلب");
        return;
      }

      const updatedProducts = products.map((item) =>
        item.id === order.productID
          ? {
              ...item,
              stock: Number(item.stock) - order.quantity,
            }
          : item,
      );

      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
    // نغيّر حالة الطلب
    const updatedOrders = orders.map((item) =>
      item.id === orderID ? { ...item, status: newStatus } : item,
    );

    setOrders(updatedOrders);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  }

  // تحديث حالة الطلب

  function handleDliders() {
    const cancelledOrders = orders.filter(
      (order) => order.status === "cancelled",
    );

    if (cancelledOrders.length === 0) {
      alert("مفيش طلبات ملغية لحذفها!");
      return;
    }

    if (window.confirm("هل تريد حذف الطلبات الملغية؟")) {
      const updatedOrders = orders.filter(
        (order) => order.status !== "cancelled",
      );

      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      alert("تم حذف الطلبات الملغية بنجاح!");
    }
  }

  return (
    <div className="orders-page">
      {/* عنوان الصفحة */}
      <div className="orders-header">
        <div className="orders-header-info">
          <h2 className="orders-title">إدارة الطلبات</h2>
          <p className="orders-subtitle">
            إنشاء الطلبات وربط المنتجات بالعملاء
          </p>
        </div>

        <div className="orders-count">
          <span className="orders-count-label">إجمالي الطلبات</span>
          <strong className="orders-count-number">{orders.length}</strong>
        </div>
      </div>

      {/* نموذج إنشاء الطلب */}
      <form className="order-form" onSubmit={handleAddOrder}>
        <h3 className="order-form-title">إنشاء طلب جديد</h3>

        <div className="order-form-grid">
          {/* اختيار المنتج */}
          <div className="order-field">
            <label htmlFor="order-product">المنتج</label>

            <select
              id="order-product"
              className="order-input"
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
            >
              <option value="">اختار منتج</option>

              {products.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.price} جنيه
                </option>
              ))}
            </select>
          </div>

          {/* اختيار العميل */}
          <div className="order-field">
            <label htmlFor="order-customer">العميل</label>

            <select
              id="order-customer"
              className="order-input"
              value={customerID}
              onChange={(e) => setCustomerID(e.target.value)}
            >
              <option value="">اختار عميل</option>

              {clients.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* تحديد الكمية */}
          <div className="order-field">
            <label htmlFor="order-quantity">الكمية</label>

            <input
              id="order-quantity"
              className="order-input"
              type="number"
              min={1}
              max={product?.stock}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            {product && (
              <small className="order-stock">
                المخزون المتاح: {product.stock} قطعة
              </small>
            )}
          </div>
        </div>

        {/* تفاصيل المنتج */}
        {product && (
          <div className="order-details">
            <h4 className="order-details-title">تفاصيل الطلب</h4>

            <div className="order-details-grid">
              <div className="order-detail-item">
                <span>المنتج</span>
                <strong>{product.name}</strong>
              </div>

              <div className="order-detail-item">
                <span>سعر القطعة</span>
                <strong>{product.price} جنيه</strong>
              </div>

              <div className="order-detail-item">
                <span>الكمية</span>
                <strong>{quantity || 0}</strong>
              </div>

              <div className="order-detail-item order-total">
                <span>الإجمالي</span>
                <strong>
                  {Number(product.price) * Number(quantity || 0)} جنيه
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* العميل المختار */}
        {customer && (
          <div className="order-selected-customer">
            <span className="customer-indicator"></span>
            العميل المختار: <strong>{customer.name}</strong>
          </div>
        )}

        <button className="order-submit-btn" type="submit">
          إنشاء الطلب
        </button>
      </form>

      {/* قائمة الطلبات */}
      <section className="orders-list-section">
        <div className="orders-list-header">
          <div>
            <h3 className="orders-list-title">الطلبات المسجلة</h3>
            <p className="orders-list-subtitle">جميع الطلبات التي تم إنشاؤها</p>
          </div>

          <button
            className="Cancelled-total"
            onClick={() => {
              handleDliders();
            }}
          >
            حذف كل الطلبات الملغية
          </button>

          <span className="orders-badge">{orders.length} طلب</span>
        </div>

        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-card" key={order.id}>
                <div className="order-card-header">
                  <div className="order-card-number">
                    <span className="order-number-label">رقم الطلب</span>
                    <strong>#{order.id}</strong>
                  </div>
                  <div className="order-card-date">
                    <span className="order-date-label">تاريخ الطلب</span>
                    <strong className="Dade-new">{order.date}</strong>
                  </div>

                  <div className="procedures">
                    {order.status === "pending" && (
                      <>
                        <button
                          type="button"
                          className="Cancel-Order"
                          onClick={() =>
                            window.confirm("هل أنت متأكد من إلغاء الطلب؟") &&
                            updateOrderStatus(order.id, "cancelled")
                          }
                        >
                          إلغاء الطلب
                        </button>

                        <button
                          type="button"
                          className="Accept-Order"
                          onClick={() =>
                            window.confirm(
                              "هل أنت متأكد من تأكيد استلام الطلب؟",
                            ) && updateOrderStatus(order.id, "completed")
                          }
                        >
                          تأكيد الاستلام
                        </button>
                      </>
                    )}
                    <span className={`order-status ${order.status}`}>
                      {order.status === "pending"
                        ? "قيد الانتظار"
                        : order.status === "completed"
                          ? "مكتمل"
                          : order.status === "cancelled"
                            ? "ملغي"
                            : order.status}
                    </span>
                  </div>
                </div>

                <div className="order-card-body">
                  <div className="order-card-item">
                    <span>العميل</span>
                    <strong>{order.customerName}</strong>
                  </div>

                  <div className="order-card-item">
                    <span>المنتج</span>
                    <strong>{order.productName}</strong>
                  </div>

                  <div className="order-card-item">
                    <span>سعر القطعة</span>
                    <strong>{order.price} جنيه</strong>
                  </div>

                  <div className="order-card-item">
                    <span>الكمية</span>
                    <strong>{order.quantity}</strong>
                  </div>
                </div>

                <div className="order-card-footer">
                  <span>إجمالي الطلب</span>
                  <strong>{order.total} جنيه</strong>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="orders-empty">
            <h3>لا توجد طلبات حتى الآن</h3>
            <p>أنشئ أول طلب ليظهر هنا.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Orders;
