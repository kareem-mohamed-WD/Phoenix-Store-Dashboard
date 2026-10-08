import { useState } from "react";

function Clients() {
  let [clients, setClients] = useState(() => {
    return JSON.parse(localStorage.getItem("clients")) || [];
  });

  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [orders, setOrders] = useState("");
  let [selectedClient, setselectedClient] = useState("");
  let [editId, setEditId] = useState(null);

  return (
    <div className="clients-page">
      {/* Header */}
      <div className="clients-header">
        <div>
          <h2>إدارة العملاء</h2>
          <p>إضافة وعرض وإدارة عملاء المتجر</p>
        </div>

        <button
          className="clients-add-btn"
          onClick={() => {
            if (editId !== null) {
              let newClient = clients.map((item) =>
                item.id === editId
                  ? {
                      ...item,
                      name: name,
                      phone: phone,
                      email: email,
                      orders: orders,
                      status: selectedClient,
                    }
                  : item,
              );

              setClients(newClient);

              localStorage.setItem("clients", JSON.stringify(newClient));

              setName("");
              setPhone("");
              setEmail("");
              setOrders("");
              setselectedClient("");
              setEditId(null);
            } else {
              if (!name || !phone || !email || !orders || !selectedClient)
                return;
              let newClient = [
                ...clients,
                {
                  id: Date.now(),
                  name: name,
                  phone: phone,
                  email: email,
                  orders: orders,
                  status: selectedClient,
                },
              ];

              setClients(newClient);

              localStorage.setItem("clients", JSON.stringify(newClient));

              setName("");
              setPhone("");
              setEmail("");
              setOrders("");
              setselectedClient("");
            }
          }}
        >
          <i className="fa-solid fa-plus"></i>
          إضافة عميل
        </button>
      </div>

      {/* Form */}
      <div className="clients-form">
        <input
          type="text"
          placeholder="اسم العميل"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="clients-input"
        />

        <input
          type="text"
          placeholder="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="clients-input"
        />

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="clients-input"
        />
        <input
          type="number"
          placeholder="عدد الطلبات"
          value={orders}
          onChange={(e) => setOrders(e.target.value)}
          className="clients-input"
        />
        <select
          onChange={(e) => {
            setselectedClient(e.target.value);
          }}
          value={selectedClient}
          className="clients-select"
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="clients-table-container">
        <table className="clients-table">
          <thead>
            <tr>
              <th>#</th>
              <th>اسم العميل</th>
              <th>الهاتف</th>
              <th>البريد الإلكتروني</th>
              <th>الطلبات</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
              <th> تغيير الحالة</th>
            </tr>
          </thead>

          <tbody>
            {clients
              .filter((item) => {
                if (!selectedClient) return true; // لو مش مختار حاجة يظهر الكل
                return item.status === selectedClient;
              })
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td>{item.name}</td>

                  <td>{item.phone}</td>

                  <td>{item.email}</td>

                  <td>{item.orders}</td>

                  <td>
                    <span
                      style={
                        item.status === "Active"
                          ? { background: "#dcfce7", color: "#15803d" }
                          : { background: "#fef3c7", color: "#a16207" }
                      }
                      className="clients-status"
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="clients-actions">
                    <button
                      onClick={() => {
                        setEditId(item.id);
                        setName(item.name);
                        setPhone(item.phone);
                        setEmail(item.email);
                        setOrders(item.orders);
                        setselectedClient(item.status);
                      }}
                      className="clients-edit"
                      title="تعديل"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>

                    <button
                      className="clients-delete"
                      title="حذف"
                      onClick={() => {
                        let newClients = clients.filter(
                          (client) => client.id !== item.id,
                        );

                        setClients(newClients);

                        localStorage.setItem(
                          "clients",
                          JSON.stringify(newClients),
                        );
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        let newClients = clients.map((client) => {
                          if (client.id === item.id) {
                            return {
                              ...client,
                              status:
                                client.status === "Active"
                                  ? "Inactive"
                                  : "Active",
                            };
                          }
                          return client;
                        });
                        setClients(newClients);
                        localStorage.setItem(
                          "clients",
                          JSON.stringify(newClients),
                        );
                      }}
                      className="clients-edit-status"
                      title="تغيير الحالة"
                    >
                      <i className="fa-solid fa-arrows-rotate"></i>
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

export default Clients;
