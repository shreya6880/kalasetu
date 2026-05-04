import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import BASE_URL from "../api"; // ✅ IMPORTANT

function Profile() {

  const [profile, setProfile] = useState({
    email: "",
    bio: "",
    location: "",
    skillsOffered: "",
    skillsWanted: ""
  });

  const [message, setMessage] = useState("");

  // Load user email
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      setProfile((prev) => ({
        ...prev,
        email: user.email
      }));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Token config
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/profile`, // ✅ FIXED
        profile,
        getAuthConfig() // ✅ TOKEN ADDED
      );

      setMessage(res.data.message);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Server Error"
      );
    }
  };

  return (

    <div className="profile-container">

      <h1>Your Profile</h1>

      <form onSubmit={handleSubmit} className="profile-card">

        <input
          name="email"
          value={profile.email}
          disabled
        />

        <textarea
          name="bio"
          placeholder="Write your bio"
          value={profile.bio}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={profile.location}
          onChange={handleChange}
        />

        <input
          name="skillsOffered"
          placeholder="Skills You Offer (comma separated)"
          value={profile.skillsOffered}
          onChange={handleChange}
        />

        <input
          name="skillsWanted"
          placeholder="Skills You Want (comma separated)"
          value={profile.skillsWanted}
          onChange={handleChange}
        />

        <button type="submit" className="save-btn">
          Save Profile
        </button>

        {message && <p>{message}</p>}

      </form>

    </div>
  );
}

export default Profile;