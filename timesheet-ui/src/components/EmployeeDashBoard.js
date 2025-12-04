import React, { useState, useEffect } from "react";
import {
  getUserTimesheets,
  createTimesheet,
  submitTimesheet,
} from "../services/api";

export default function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  const [timesheets, setTimesheets] = useState([]);
  const [form, setForm] = useState({
    weekStartDate: "",
    weekEndDate: "",
  });

  const [entries, setEntries] = useState([
    { date: "", project: "", taskDescription: "", hoursWorked: "" },
  ]);

  const fetchTimesheets = async () => {
    if (!userId) return;
    try {
      const res = await getUserTimesheets(userId);
      setTimesheets(res.data);
    } catch (err) {
      console.error("Error fetching timesheets", err);
    }
  };

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEntryChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      { date: "", project: "", taskDescription: "", hoursWorked: "" },
    ]);
  };

  const handleCreate = async () => {
    const payload = {
      userId,
      weekStartDate: form.weekStartDate,
      weekEndDate: form.weekEndDate,
      entries: entries.map((e) => ({
        date: e.date,
        project: e.project || "General Work",
        taskDescription: e.taskDescription,
        hoursWorked: Number(e.hoursWorked),
      })),
    };

    try {
      await createTimesheet(payload);
      fetchTimesheets();
    } catch (err) {
      console.error("CREATE ERROR:", err);
    }
  };

  const handleSubmit = async (id) => {
    await submitTimesheet(id);
    fetchTimesheets();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
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
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "bold",
            }}
          >
            🧑‍💼 Employee Dashboard
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
          <h2>Create Timesheet</h2>

          {/* Week Inputs */}
          <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
            <input
              type="date"
              name="weekStartDate"
              onChange={handleFormChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "200px",
              }}
            />
            <input
              type="date"
              name="weekEndDate"
              onChange={handleFormChange}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "200px",
              }}
            />
          </div>

          <h3 style={{ marginBottom: "10px", color: "#0066B3" }}>Entries</h3>

          {entries.map((e, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
            >
              <input
                type="date"
                value={e.date}
                onChange={(ev) => handleEntryChange(i, "date", ev.target.value)}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="text"
                placeholder="Project"
                value={e.project}
                onChange={(ev) =>
                  handleEntryChange(i, "project", ev.target.value)
                }
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="text"
                placeholder="Task Description"
                value={e.taskDescription}
                onChange={(ev) =>
                  handleEntryChange(i, "taskDescription", ev.target.value)
                }
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="number"
                placeholder="Hours"
                value={e.hoursWorked}
                onChange={(ev) =>
                  handleEntryChange(i, "hoursWorked", ev.target.value)
                }
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          ))}

          <button
            onClick={addEntry}
            style={{
              padding: "10px 15px",
              marginRight: "10px",
              background: "#4c6ef5",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            + Add Entry
          </button>

          <button
            onClick={handleCreate}
            style={{
              padding: "10px 20px",
              background: "#2a9d8f",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Create Timesheet
          </button>

          {/* Timesheets Table */}
          <h3 style={{ marginTop: "30px", color: "#0066B3" }}>My Timesheets</h3>

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
                <th style={{ padding: "12px" }}>Start</th>
                <th style={{ padding: "12px" }}>End</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Submit</th>
              </tr>
            </thead>

            <tbody>
              {timesheets.map((t) => (
                <tr key={t.timesheetId} style={{ textAlign: "center" }}>
                  <td style={{ padding: "10px" }}>{t.timesheetId}</td>
                  <td style={{ padding: "10px" }}>
                    {t.weekStartDate?.split("T")[0]}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {t.weekEndDate?.split("T")[0]}
                  </td>
                  <td style={{ padding: "10px" }}>{t.status}</td>
                  <td style={{ padding: "10px" }}>
                    {t.status === "Draft" && (
                      <button
                        onClick={() => handleSubmit(t.timesheetId)}
                        style={{
                          padding: "6px 12px",
                          background: "#e76f51",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
