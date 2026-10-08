import { useState } from "react";

function Employees() {
  let [employees, setEmployees] = useState(() => {
    return JSON.parse(localStorage.getItem("employees")) || [];
  });

  let [name, setName] = useState("");
  let [role, setRole] = useState("");
  let [phone, setPhone] = useState("");
  let [salary, setSalary] = useState("");
  let [search, setSearch] = useState("");
  let [eid, setEid] = useState(null);

  return (
    <div className="employees-page">
      <div className="employees-header">
        <div>
          <h2>إدارة الموظفين</h2>
          <p>إضافة وعرض وإدارة موظفي المتجر</p>
        </div>

        <button
          className="employees-add-btn"
          onClick={() => {
            if (eid !== null) {
              let newEmployee = employees.map((item) =>
                item.id === eid
                  ? {
                      ...item,
                      name: name,
                      role: role,
                      phone: phone,
                      salary: salary,
                    }
                  : item,
              );

              setEmployees(newEmployee);
              localStorage.setItem("employees", JSON.stringify(newEmployee));
              setName("");
              setRole("");
              setPhone("");
              setSalary("");
              setEid(null);
            } else {
              let newEmployee = [
                ...employees,
                {
                  id: Date.now(),
                  name: name,
                  role: role,
                  phone: phone,
                  salary: salary,
                },
              ];

              setEmployees(newEmployee);
              localStorage.setItem("employees", JSON.stringify(newEmployee));
              setName("");
              setRole("");
              setPhone("");
              setSalary("");
            }
          }}
        >
          <i className="fa-solid fa-plus"></i>
          {eid !== null ? "  تعديل موظف" : "اضافة موظف"}
        </button>
      </div>

      <div className="employees-form">
        <input
          type="text"
          placeholder="اسم الموظف"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="employees-input"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="employees-input"
        >
          <option value="">اختر الوظيفة</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
        </select>

        <input
          type="text"
          placeholder="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="employees-input"
        />

        <input
          type="number"
          placeholder="المرتب"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="employees-input"
        />
      </div>

      <div className="employees-search">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder="ابحث عن موظف"
          className="employees-input"
        />
      </div>

      <div className="employees-table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>#</th>
              <th>الاسم</th>
              <th>الوظيفة</th>
              <th>الهاتف</th>
              <th>المرتب</th>
              <th>الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {employees
              .filter((item) => item.name.includes(search))
              .filter((item) => item.role.includes(role))
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td>{item.name}</td>

                  <td>{item.role}</td>

                  <td>{item.phone}</td>

                  <td>${item.salary}</td>

                  <td className="employees-actions">
                    <button
                      onClick={() => {
                        setEid(item.id);
                        setName(item.name);
                        setRole(item.role);
                        setPhone(item.phone);
                        setSalary(item.salary);
                      }}
                      className="employees-edit"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>

                    <button
                      className="employees-delete"
                      onClick={() => {
                        let newEmployees = employees.filter(
                          (employee) => employee.id !== item.id,
                        );

                        setEmployees(newEmployees);

                        localStorage.setItem(
                          "employees",
                          JSON.stringify(newEmployees),
                        );
                      }}
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

export default Employees;
