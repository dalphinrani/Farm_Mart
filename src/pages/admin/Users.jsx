import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/users.css";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://farm-mart-backend-ukda.onrender.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `https://farm-mart-backend-ukda.onrender.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      setUsers(
        users.filter(
          (user) => user.id !== id
        )
      );

      alert("User Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="users-layout">
      <AdminSidebar />

      <div className="users-content">
        <h1>Users Management</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>
                    {user.name ||
                      `${user.firstName || ""} ${user.lastName || ""}`}
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUser(user.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
