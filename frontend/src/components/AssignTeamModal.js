import React, { useEffect, useState } from "react";
import api from "../api";

export default function AssignTeamModal({ employee, teams, onClose, onAssigned }) {
  const [selected, setSelected] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(()=>{
    setSelected((employee.Teams || []).map(t=>t.id));
  }, [employee]);

  const toggle = (id) => {
    setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);
  };

  const save = async () => {
    setSaving(true);
    try {
      await api.assignEmployee(employee.id, selected);
      onAssigned();
    } catch {
      alert("Assign failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-card">
        <div className="modal-head">
          <h3>Assign teams — {employee.firstName} {employee.lastName}</h3>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="checkbox-list">
            {teams.map(t => (
              <label key={t.id} className="checkbox-item">
                <input type="checkbox" checked={selected.includes(t.id)} onChange={()=>toggle(t.id)} />
                <div>
                  <div className="checkbox-title">{t.name}</div>
                  <div className="muted small">{t.description}</div>
                </div>
              </label>
            ))}
            {teams.length === 0 && <div className="muted">No teams found — create one first.</div>}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        </div>
      </div>
    </div>
  );
}
