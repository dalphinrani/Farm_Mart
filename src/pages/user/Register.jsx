import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      const checkUser = await fetch(
        `https://farm-mart-backend-ukda.onrender.com/users?email=${formData.email}`
      );

      const existingUser =
        await checkUser.json();

      if (existingUser.length > 0) {
        alert("Email already registered");
        return;
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "user",
      };

      const response = await fetch(
        "https://farm-mart-backend-ukda.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
  throw new Error(
    "Registration Failed"
  );
}

/* SAVE USER COUNT FOR DASHBOARD */
const users =
  JSON.parse(
    localStorage.getItem("registeredUsers")
  ) || [];

users.push({
  name: formData.name,
  email: formData.email,
});

localStorage.setItem(
  "registeredUsers",
  JSON.stringify(users)
);

window.dispatchEvent(
  new Event("usersUpdated")
);

alert(
  "Registration Successful"
);

navigate("/login");
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="register-container">
        <div className="register-card">

          <div className="register-logo">
            🌿
          </div>

          <h1>Create Account</h1>

          <p className="register-subtitle">
            Join FarmMart and bring fresh products home.
          </p>

          <form
            onSubmit={handleSubmit}
            className="register-form"
          >

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={
                handleChange
              }
              required
            />

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={
                handleChange
              }
              required
            />

            <label>
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={
                handleChange
              }
              required
            />

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={
                handleChange
              }
              required
            />

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={
                formData.confirmPassword
              }
              onChange={
                handleChange
              }
              required
            />

            <button type="submit">
              Create Account
            </button>

          </form>

          <p className="register-footer-text">
            Already have an account?{" "}
            <span
              onClick={() =>
                navigate("/Login")
              }
            >
              Login
            </span>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;
