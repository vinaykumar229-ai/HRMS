import React from "react";

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">HRMS</div>

      <nav className="sidebar-nav">
        <button className={`nav-btn ${active==='employees' ? 'active':''}`} onClick={()=>onChange('employees')}>
          Employees
        </button>
        <button className={`nav-btn ${active==='teams' ? 'active':''}`} onClick={()=>onChange('teams')}>
          Teams
        </button>
        <button className={`nav-btn ${active==='logs' ? 'active':''}`} onClick={()=>onChange('logs')}>
          Logs
        </button>
      </nav>
    </aside>
  );
}
