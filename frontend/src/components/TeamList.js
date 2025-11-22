import React, { useEffect, useState } from "react";
import api from "../api";
import TeamForm from "./TeamForm";

export default function TeamList() {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [busy, setBusy] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      setBusy(true);
      const [tms, emps] = await Promise.all([api.getTeams(), api.getEmployees()]);
      setTeams(tms || []);
      setEmployees(emps || []);
    } catch {
      alert("Failed to load");
    } finally { setBusy(false); }
  };

  useEffect(()=>{ load(); }, []);

  const onCreate = ()=> { setEditing(null); setShowForm(true); };
  const onEdit = (t)=> { setEditing(t); setShowForm(true); };
  const onDelete = async (id) => {
    if (!window.confirm("Delete team?")) return;
    try {
      await api.deleteTeam(id);
      setTeams(s=>s.filter(x=>x.id!==id));
    } catch { alert("Delete failed"); }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Teams</h2>
        <div>
          <button className="btn-ghost" onClick={load}>Refresh</button>
          <button className="btn-primary" onClick={onCreate}>Create Team</button>
        </div>
      </div>

      <div className="panel-body">
        {busy ? <div className="muted">Loading...</div> : (
          <div className="cards-grid">
            {teams.map(t=>(
              <div key={t.id} className="card-entity">
                <div className="card-entity-header">
                  <div>
                    <div className="entity-name">{t.name}</div>
                    <div className="entity-sub muted">{t.description}</div>
                  </div>
                  <div className="entity-id">#{t.id}</div>
                </div>

                <div className="card-entity-body">
                  <div><strong>Members:</strong> {(t.Employees||[]).map(e=>e.firstName + " " + e.lastName).join(", ") || "-"}</div>
                </div>

                <div className="card-entity-actions">
                  <button className="btn-sm" onClick={()=>onEdit(t)}>Edit</button>
                  <button className="btn-sm danger" onClick={()=>onDelete(t.id)}>Delete</button>
                </div>
              </div>
            ))}
            {teams.length === 0 && <div className="muted">No teams yet — create one.</div>}
          </div>
        )}
      </div>

      {showForm && (
        <TeamForm team={editing} onClose={()=>{ setShowForm(false); setEditing(null); }} onSuccess={()=>{ setShowForm(false); load(); }} />
      )}
    </div>
  );
}
