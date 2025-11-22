import React, { useEffect, useState } from "react";
import api from "../api";
import EmployeeForm from "./EmployeeForm";
import AssignTeamModal from "./AssignTeamModal";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [busy, setBusy] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showAssign, setShowAssign] = useState(false);
  const [assigningEmployee, setAssigningEmployee] = useState(null);

  const load = async () => {
    try {
      setBusy(true);
      const [emps, tms] = await Promise.all([api.getEmployees(), api.getTeams()]);
      setEmployees(emps || []);
      setTeams(tms || []);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to load employees");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const onEdit = (emp) => {
    setEditing(emp);
    setShowForm(true);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete employee?")) return;
    try {
      await api.deleteEmployee(id);
      setEmployees((s) => s.filter((e) => e.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const onAssignClick = (emp) => {
    setAssigningEmployee(emp);
    setShowAssign(true);
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Employees</h2>
        <div>
          <button className="btn-ghost" onClick={load}>Refresh</button>
          <button className="btn-primary" onClick={onCreate}>Add Employee</button>
        </div>
      </div>

      <div className="panel-body">
        {busy ? (
          <div className="muted">Loading...</div>
        ) : (
          <>
            <div className="cards-grid">
              {employees.map((emp) => (
                <div key={emp.id} className="card-entity">
                  <div className="card-entity-header">
                    <div>
                      <div className="entity-name">
                        {[emp.firstName, emp.lastName].filter(Boolean).join(" ") || "Unnamed"}
                      </div>
                      <div className="entity-sub muted">{emp.position || "No role"}</div>
                    </div>
                    <div className="entity-id">#{emp.id}</div>
                  </div>

                  <div className="card-entity-body">
                    <div><strong>Email:</strong> {emp.email}</div>
                    <div><strong>Phone:</strong> {emp.phone || "-"}</div>
                    <div className="mt8">
                      <strong>Teams:</strong>{" "}
                      {(emp.Teams || []).map((t) => t.name).join(", ") || "-"}
                    </div>
                  </div>

                  <div className="card-entity-actions">
                    <button className="btn-sm" onClick={() => onEdit(emp)}>Edit</button>
                    <button className="btn-sm ghost" onClick={() => onAssignClick(emp)}>Assign</button>
                    <button className="btn-sm danger" onClick={() => onDelete(emp.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            {employees.length === 0 && (
              <div className="muted">No employees yet — add one.</div>
            )}
          </>
        )}
      </div>

      {showForm && (
        <EmployeeForm
          employee={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSuccess={() => {
            setShowForm(false);
            load();
          }}
        />
      )}

      {showAssign && assigningEmployee && (
        <AssignTeamModal
          employee={assigningEmployee}
          teams={teams}
          onClose={() => {
            setShowAssign(false);
            setAssigningEmployee(null);
          }}
          onAssigned={() => {
            setShowAssign(false);
            load();
          }}
        />
      )}
    </div>
  );
}