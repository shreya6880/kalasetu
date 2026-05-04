import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../api"; // ✅ IMPORTANT

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!form.email || !form.password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`, // ✅ FIXED
        form
      );

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // ✅ Success message
      setMessage("Login successful!");

      // ✅ Redirect
      navigate("/dashboard");

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={{ padding: "10px", width: "250px" }}
        />

        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={{ padding: "10px", width: "250px" }}
        />

        <br /><br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

      </form>

      <p>{message}</p>

      <p>
        Don't have an account?{" "}
        <Link to="/signup">Signup</Link>
      </p>

    </div>
  );
}

export default Login;