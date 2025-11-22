import React, { useEffect, useState } from "react";
import api from "../api";

export default function LogsList() {
  const [logs, setLogs] = useState([]);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setBusy(true);
      const data = await api.getLogs();
      setLogs(data || []);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to load logs");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatLogMessage = (log) => {
    const timestamp = formatTimestamp(log.timestamp);
    const userName = log.userName || `User '${log.userId}'`;
    
    switch (log.action) {
      case "User login":
        return `[${timestamp}] ${userName} logged in.`;
      case "User logout":
        return `[${timestamp}] ${userName} logged out.`;
      case "User signup":
        return `[${timestamp}] ${userName} signed up.`;
      case "Employee created":
        return `[${timestamp}] ${userName} added a new employee with ID ${log.meta?.employeeId || "N/A"}.`;
      case "Employee updated":
        return `[${timestamp}] ${userName} updated employee ${log.meta?.employeeId || "N/A"}.`;
      case "Employee deleted":
        return `[${timestamp}] ${userName} deleted employee ${log.meta?.employeeId || "N/A"}.`;
      case "Employee assigned to teams":
        return `[${timestamp}] ${userName} assigned employee ${log.meta?.employeeId || "N/A"} to team${log.meta?.teamIds?.length > 1 ? "s" : ""} ${log.meta?.teamIds?.join(", ") || "N/A"}.`;
      case "Team created":
        return `[${timestamp}] ${userName} added a new team with ID ${log.meta?.teamId || "N/A"}.`;
      case "Team updated":
        return `[${timestamp}] ${userName} updated team ${log.meta?.teamId || "N/A"}.`;
      case "Team deleted":
        return `[${timestamp}] ${userName} deleted team ${log.meta?.teamId || "N/A"}.`;
      default:
        return `[${timestamp}] ${userName} performed action: ${log.action}.`;
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Activity Logs</h2>
        <div>
          <button className="btn-ghost" onClick={load}>Refresh</button>
        </div>
      </div>

      <div className="panel-body">
        {busy ? (
          <div className="muted">Loading...</div>
        ) : (
          <div className="logs-container">
            {logs.length === 0 ? (
              <div className="muted">No logs yet.</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="log-entry">
                  <div className="log-message">{formatLogMessage(log)}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

