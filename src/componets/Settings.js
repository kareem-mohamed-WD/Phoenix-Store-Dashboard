import { useState , useEffect  } from "react";

function Settings() {
  const [storeName, setStoreName] = useState(
    localStorage.getItem("storeName") || "Phoenix Store",
  );
useEffect(() => {
  document.body.classList.toggle("dark-mode", darkMode);

  localStorage.setItem("theme", darkMode ? "dark" : "light");
}, [darkMode]);
  const [email, setEmail] = useState(localStorage.getItem("storeEmail") || "");
  const [phone, setPhone] = useState(localStorage.getItem("storePhone") || "");
  const [Notifications, setNotifications] = useState(() => {
    let saved = localStorage.getItem("storeNotifications");
    return saved !== null ? saved === "true" : true;
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <h1>الإعدادات</h1>
          <p>إدارة إعدادات المتجر والحساب</p>
        </div>
      </div>

      <div className="settings-content">
        {/* معلومات المتجر */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <i className="fa-solid fa-store"></i>
            </div>

            <div>
              <h2>معلومات المتجر</h2>
              <p>تعديل بيانات المتجر الأساسية</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="settings-field">
              <label>اسم المتجر</label>

              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="اسم المتجر"
              />
            </div>

            <div className="settings-field">
              <label>البريد الإلكتروني</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="store@example.com"
              />
            </div>

            <div className="settings-field">
              <label>رقم الهاتف</label>

              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01000000000"
              />
            </div>
          </div>
        </div>

        {/* الإشعارات */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <i className="fa-solid fa-bell"></i>
            </div>

            <div>
              <h2>الإشعارات</h2>
              <p>التحكم في إشعارات لوحة التحكم</p>
            </div>
          </div>

          <div className="settings-option">
            <div>
              <h3>تفعيل الإشعارات</h3>
              <p>السماح للداشبورد بعرض الإشعارات</p>
            </div>

            <button
              type="button"
              className={`settings-toggle ${Notifications ? "active" : ""}`}
              onClick={() => setNotifications(!Notifications)}
            >
              {" "}
              <span></span>{" "}
            </button>
          </div>
        </div>
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <i className="fa-solid fa-database"></i>
            </div>

            <div>
              <h2>إدارة البيانات</h2>
              <p>إدارة وحذف بيانات المتجر</p>
            </div>
          </div>

          <div className="settings-data-actions">
            <button
              onClick={() => {
                if (window.confirm("هل أنت متأكد من حذف كل العملاء؟")) {
                  localStorage.removeItem("clients");
                  alert("تم حذف جميع العملاء");
                }
              }}
            >
              <i className="fa-solid fa-users"></i>
              حذف كل العملاء
            </button>

            <button
              onClick={() => {
                if (window.confirm("هل أنت متأكد من حذف كل الموظفين؟")) {
                  localStorage.removeItem("employees");
                  alert("تم حذف جميع الموظفين");
                }
              }}
            >
              <i className="fa-solid fa-user-tie"></i>
              حذف كل الموظفين
            </button>

            <button
              onClick={() => {
                if (window.confirm("هل أنت متأكد من حذف كل المنتجات؟")) {
                  localStorage.removeItem("products");
                  alert("تم حذف جميع المنتجات");
                }
              }}
            >
              <i className="fa-solid fa-box"></i>
              حذف كل المنتجات
            </button>

            <button
              onClick={() => {
                if (window.confirm("هل أنت متأكد من حذف كل بيانات المتجر؟")) {
                  localStorage.removeItem("clients");
                  localStorage.removeItem("employees");
                  localStorage.removeItem("products");

                  alert("تم حذف جميع البيانات");
                }
              }}
            >
              <i className="fa-solid fa-trash"></i>
              حذف كل البيانات
            </button>
          </div>
          <div className="settings-option">
            <div>
              <h3>الوضع الداكن</h3>
              <p>تغيير مظهر لوحة التحكم بين الوضع الفاتح والداكن</p>
            </div>

<button
  type="button"
  className={`settings-toggle ${darkMode ? "active" : ""}`}
  onClick={() => setDarkMode(!darkMode)}
>
  <span></span>
</button>
          </div>
        </div>

        {/* حفظ */}
        <div className="settings-actions">
          <button
            onClick={() => {
              localStorage.setItem("storeName", storeName);
              localStorage.setItem("storeEmail", email);
              localStorage.setItem("storePhone", phone);
              localStorage.setItem("storeNotifications", Notifications);
              alert("تم حفظ الإعدادات");
            }}
            className="settings-save-btn"
          >
            <i className="fa-solid fa-floppy-disk"></i>
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
