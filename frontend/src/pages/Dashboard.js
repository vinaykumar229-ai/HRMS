import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import EmployeeList from "../components/EmployeeList";
import TeamList from "../components/TeamList";
import LogsList from "../components/LogsList";

export default function Dashboard() {
  const [view, setView] = useState("employees");

  return (
    <div className="app-shell">
      <Sidebar active={view} onChange={setView} />
      <div className="main-column">
        <Topbar />
        <main className="content-area">
          {view === "employees" && <EmployeeList />}
          {view === "teams" && <TeamList />}
          {view === "logs" && <LogsList />}
        </main>
      </div>
    </div>
  );
}
