import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/settings.css";

function Settings() {
  const [siteName, setSiteName] = useState("FarmMart");
  const [email, setEmail] = useState(
    "admin@farmmart.com"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings Updated Successfully");
  };

  return (
    <div className="settings-layout">
      <AdminSidebar />

      <div className="settings-content">
        <h1>Website Settings</h1>

        <form
          className="settings-form"
          onSubmit={handleSubmit}
        >
          <label>Website Name</label>

          <input
            type="text"
            value={siteName}
            onChange={(e) =>
              setSiteName(e.target.value)
            }
          />

          <label>Admin Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button type="submit">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;