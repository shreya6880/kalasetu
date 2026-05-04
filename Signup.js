import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../api"; // ✅ IMPORTANT

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

    try {

      const res = await axios.post(
        `${BASE_URL}/api/auth/signup`, // ✅ FIXED
        form
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {

      setMessage(
        err.response?.data?.message || "Server Error"
      );
    }
  };

  return (
    <div style={{ padding: "40px" }}>

      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Signup
        </button>

      </form>

      <p>{message}</p>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>

    </div>
  );
}

export default Signup;