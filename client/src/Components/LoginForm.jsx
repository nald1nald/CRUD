import React, { useState } from "react";
import axios from "axios";
import RegisterForm from "./RegisterForm";

const LoginForm = ({ handleLogin }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", formData); // Assuming your login API endpoint is "/auth/login"
      if (response.data.token) {
        handleLogin(response.data.token);
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button type="button" onClick={handleShowRegisterForm}>
          Register here
        </button>
      </p>
      {showRegisterForm && <RegisterForm />}
    </div>
  );
};

export default LoginForm;
