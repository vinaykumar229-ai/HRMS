import React, { useEffect, useState } from "react";
import api from "../api";

export default function TeamForm({ team, onClose, onSuccess }) {
  const isEdit = Boolean(team);
  const [form, setForm] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);

  useEffect(()=> {
    if (isEdit) setForm({ name: team.name || "", description: team.description || "" });
  }, [team]);

  const change = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name) return alert("Team name required");
    setSaving(true);
    try {
      if (isEdit) await api.updateTeam(team.id, form);
      else await api.createTeam(form);
      onSuccess();
    } catch {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-card">
        <div className="modal-head">
          <h3>{isEdit ? "Edit Team" : "Create Team"}</h3>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>

        <form className="modal-body" onSubmit={submit}>
          <div className="form-row">
            <label>Name</label>
            <input name="name" value={form.name} onChange={change} required />
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={change} rows={4} />
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
