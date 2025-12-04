import React, { useState, useEffect, useCallback } from "react";
import {
  getSubmittedTimesheets,
  approveTimesheet,
  rejectTimesheet,
} from "../services/api";

export default function ManagerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    if (!user || role?.toLowerCase() !== "manager") {
      window.location.href = "/";
    }
  }, [user, role]);

  const fetchSubmitted = useCallback(async () => {
    try {
      const res = await getSubmittedTimesheets();
      setTimesheets(res.data);
    } catch (error) {
      console.error("Error fetching submitted timesheets:", error);
    }
  }, []);

  useEffect(() => {
    fetchSubmitted();
  }, [fetchSubmitted]);

  const handleApprove = async (id) => {
    await approveTimesheet(id, "Approved by manager");
    fetchSubmitted();
  };

  const handleReject = async (id) => {
    await rejectTimesheet(id, "Please review hours again");
    fetchSubmitted();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f2f2f7",
        fontFamily: "Segoe UI, Arial",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "230px",
          background: "#0066B3",
          color: "white",
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", paddingBottom: "25px" }}>
          <img
            src="/franklar-logo.png"
            alt="Franklar Logo"
            style={{ height: "65px", marginBottom: "10px" }}
          />
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
            FRANKLAR TECHNOLOGIES
          </h3>
          <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>
            Pathway for Success
          </p>
        </div>

        <div style={{ padding: "0 15px", marginTop: "15px" }}>
          <div
            style={{
              padding: "12px 15px",
              borderRadius: "6px",
              background: "#0054A1",
              marginBottom: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "bold",
            }}
          >
            🏠 Dashboard
          </div>

          <div
            style={{
              padding: "12px 15px",
              borderRadius: "6px",
              background: "transparent",
              marginBottom: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            📄 Timesheets
          </div>

          <div
            style={{
              padding: "12px 15px",
              borderRadius: "6px",
              marginTop: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#FFDDDD",
            }}
            onClick={handleLogout}
          >
            🚪 Logout
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            background: "#0066B3",
            color: "white",
            padding: "6px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>
            📧 info@franklartechnologies.com
          </span>
        </div>

        <div
          style={{
            maxWidth: "1000px",
            margin: "30px auto",
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Manager Dashboard</h2>
          <h4 style={{ marginBottom: "10px", color: "#0066B3" }}>
            Submitted Timesheets
          </h4>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            <thead style={{ background: "#4c6ef5", color: "white" }}>
              <tr>
                <th style={{ padding: "12px" }}>ID</th>
                <th style={{ padding: "12px" }}>User</th>
                <th style={{ padding: "12px" }}>Start</th>
                <th style={{ padding: "12px" }}>End</th>
                <th style={{ padding: "12px" }}>Hours</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {timesheets.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{ textAlign: "center", padding: "15px" }}
                  >
                    No submitted timesheets found.
                  </td>
                </tr>
              ) : (
                timesheets.map((t) => {
                  const totalHours = t.entries?.reduce(
                    (sum, e) => sum + e.hours,
                    0
                  );

                  return (
                    <tr key={t.timesheetId} style={{ textAlign: "center" }}>
                      <td style={{ padding: "10px" }}>{t.timesheetId}</td>
                      <td style={{ padding: "10px" }}>{t.user?.email}</td>
                      <td style={{ padding: "10px" }}>
                        {t.weekStartDate.split("T")[0]}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {t.weekEndDate.split("T")[0]}
                      </td>
                      <td style={{ padding: "10px" }}>{totalHours}</td>
                      <td style={{ padding: "10px" }}>{t.status}</td>

                      <td
                        style={{
                          padding: "10px",
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={() => handleApprove(t.timesheetId)}
                          style={{
                            background: "#2a9d8f",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleReject(t.timesheetId)}
                          style={{
                            background: "#e76f51",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
