import React, { useEffect, useState } from "react";
import api from "../api";

export default function EmployeeForm({ employee, onClose, onSuccess }) {
  const isEdit = Boolean(employee);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    phone: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(()=>{
    if (isEdit) {
      setForm({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        position: employee.position || "",
        phone: employee.phone || ""
      });
    }
  }, [employee]);

  const change = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email) return alert("First name and email are required");
    setSaving(true);
    try {
      if (isEdit) await api.updateEmployee(employee.id, form);
      else await api.createEmployee(form);
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-card">
        <div className="modal-head">
          <h3>{isEdit ? "Edit Employee" : "Add Employee"}</h3>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>

        <form className="modal-body" onSubmit={submit}>
          <div className="form-row">
            <label>First name</label>
            <input name="firstName" value={form.firstName} onChange={change} required />
          </div>

          <div className="form-row">
            <label>Last name</label>
            <input name="lastName" value={form.lastName} onChange={change} />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={change} required />
          </div>

          <div className="form-row">
            <label>Position</label>
            <input name="position" value={form.position} onChange={change} />
          </div>

          <div className="form-row">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={change} />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving..." : (isEdit ? "Update" : "Create")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
