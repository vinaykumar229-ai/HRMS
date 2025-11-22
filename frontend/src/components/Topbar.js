import React, { useEffect, useState } from "react";
import { clearToken } from "../auth";
import api from "../api";

export default function Topbar() {
  const [orgName, setOrgName] = useState("");

  useEffect(() => {
    let alive = true;
    api.getProfile()
      .then((profile) => {
        if (!alive) return;
        setOrgName(profile.organization?.name || "");
      })
      .catch((err) => {
        console.warn("Failed to fetch profile", err);
      });
    return () => {
      alive = false;
    };
  }, []);

  const logout = async () => {
    try {
      await api.logout();
    } catch (err) {
      console.warn("Logout request failed", err);
    } finally {
      clearToken();
      window.location = "/login";
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h3 className="brand-sm">{orgName || "Organization"}</h3>
      </div>
      <div className="topbar-right">
        <button className="btn-ghost" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
