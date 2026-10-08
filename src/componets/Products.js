import { useState } from "react";

function Products() {
  let [listproducts, setListproducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || [];
  });

  let [product, setProduct] = useState("");
  let [classification, setClassification] = useState("");
  let [price, setPrice] = useState("");
  let [quantity, setQuantity] = useState("");
  let [search, setSearch] = useState("");
  let [editId, setEditId] = useState(null);
  return (
    <div className="page-container">
      {/* هيدر الصفحة */}
      <div className="page-header">
        <div>
          <h2>إدارة المنتجات</h2>
          <p>عرض وإضافة وتعديل المنتجات المتاحة في المتجر</p>
        </div>
        <button
          onClick={() => {
            if (editId !== null) {
              let newProducts = listproducts.map((item) =>
                item.id === editId
                  ? {
                      ...item,
                      name: product,
                      category: classification,
                      price: price,
                      stock: quantity,
                    }
                  : item,
              );

              setListproducts(newProducts);
              localStorage.setItem("products", JSON.stringify(newProducts));

              setEditId(null);
            } else {
              let newProduct = [
                ...listproducts,
                {
                  id: Date.now(),
                  name: product,
                  category: classification,
                  price: price,
                  stock: quantity,
                  status: "Available",
                },
              ];

              setListproducts(newProduct);
              localStorage.setItem("products", JSON.stringify(newProduct));
            }
          }}
          className="btn-primary"
        >
          <i className="fa-solid fa-plus"></i>
          {editId !== null ? "تعديل المنتج" : "إضافة منتج جديد"}
        </button>
      </div>

      {/* شريط البحث والفلترة */}
      <div className="filter-bar">
        <input
          onChange={(e) => {
            setProduct(e.target.value);
          }}
          value={product}
          type="text"
          placeholder="اضافه المنتج"
          className="addition-input"
        />

        <select
          onChange={(e) => {
            setClassification(e.target.value);
          }}
          value={classification}
          className="filter-select"
        >
          <option value="">كل التصنيفات</option>
          <option value="electronics">إلكترونيات</option>
          <option value="fashion">ملابس</option>
        </select>
        <input
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
          placeholder="السعر"
          type="number"
          className="date-input"
        />
        <input
        value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          placeholder="الكمية"
          type="number"
          className="date-input"
        />
      </div>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
        placeholder="Search"
        className="search-input"
      />
      {/* جدول المنتجات */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>اسم المنتج</th>
              <th>التصنيف</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {listproducts
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()),
              )
              .filter((item) =>
                classification
                  ? item.category === classification
                  : item.category,
              )
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="fw-bold">{item.name}</td>
                  <td>{item.category}</td>
                  <td>${item.price}</td>
                  <td>{item.stock}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.stock === 0
                          ? "badge-danger"
                          : item.stock < 10
                            ? "badge-warning"
                            : "badge-success"
                      }`}
                    >
                      {item.stock <= 0
                        ? "غير متوفر"
                        : item.stock < 10
                          ? "قليل"
                          : "متوفر"}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      onClick={() => {
                        setProduct(item.name);
                        setClassification(item.category);
                        setPrice(item.price);
                        setQuantity(item.stock);
                        setEditId(item.id);
                      }}
                      className="btn-icon edit-btn"
                      title="تعديل"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      onClick={() => {
                        let newProducts = listproducts.filter(
                          (product) => product.id !== item.id,
                        );
                        setListproducts(newProducts);
                        localStorage.setItem(
                          "products",
                          JSON.stringify(newProducts),
                        );
                      }}
                      className="btn-icon delete-btn"
                      title="حذف"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
