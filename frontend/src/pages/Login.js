import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { saveToken } from "../auth";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api.login({ email, password });
      if (res.token) {
        saveToken(res.token);
        nav("/");
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="brand">HRMS</h1>
        <p className="muted">Sign in to manage employees & teams</p>

        <form onSubmit={submit} className="auth-form">
          <label>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required />

          <label>Password</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />

          <button className="btn-primary" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
        </form>

        <div className="auth-footer">
          <small>Don't have an organization? <Link to="/signup">Create one</Link></small>
        </div>
      </div>
    </div>
  );
}
