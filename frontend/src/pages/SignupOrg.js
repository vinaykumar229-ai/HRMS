import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { saveToken } from "../auth";

export default function SignupOrg() {
  const nav = useNavigate();
  const [orgName, setOrgName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api.signup({
        organizationName: orgName,
        name: adminName,
        email: adminEmail,
        password,
      });
      if (res.token) {
        saveToken(res.token);
        nav("/");
      } else {
        alert(res.message || "Signup failed");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || "Signup error";
      console.error("Signup error:", err);
      alert(errorMsg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="brand">HRMS</h1>
        <p className="muted">Create organization & admin account</p>

        <form onSubmit={submit} className="auth-form">
          <label>Organization name</label>
          <input value={orgName} onChange={(e) => setOrgName(e.target.value)} required />

          <label>Admin name</label>
          <input value={adminName} onChange={(e) => setAdminName(e.target.value)} required />

          <label>Admin email</label>
          <input value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} type="email" required />

          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />

          <button className="btn-primary" disabled={busy}>
            {busy ? "Creating..." : "Create organization"}
          </button>
        </form>
      </div>
    </div>
  );
}