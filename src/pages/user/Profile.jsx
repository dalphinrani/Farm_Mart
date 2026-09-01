import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>My Profile</h1>

        <h3>Name: {user?.name}</h3>
        <h3>Email: {user?.email}</h3>
        <h3>Role: {user?.role}</h3>
      </div>

      <Footer />
    </>
  );
}

export default Profile;