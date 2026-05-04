import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import BASE_URL from "../api"; // ✅ IMPORTANT

function Dashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  // Load data
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchUsers();
    fetchRequests();
  }, [navigate]);

  // Get token
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/auth/users`,
        getAuthConfig() // ✅ token added
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch requests
  const fetchRequests = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email;

      if (!email) return;

      const res = await axios.get(
        `${BASE_URL}/api/auth/requests/${email}`,
        getAuthConfig() // ✅ token added
      );

      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Send request
  const sendRequest = async (receiverEmail) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const senderEmail = user?.email;

      if (!senderEmail) {
        alert("Please login again");
        return;
      }

      const res = await axios.post(
        `${BASE_URL}/api/auth/request`,
        { senderEmail, receiverEmail },
        getAuthConfig() // ✅ token added
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending request");
    }
  };

  // Update request
  const updateRequestStatus = async (requestId, status) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/auth/request/status`,
        { requestId, status },
        getAuthConfig() // ✅ token added
      );

      alert(res.data.message);
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating request");
    }
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const offered =
      user.skillsOffered?.join(" ").toLowerCase() || "";

    return offered.includes(search.toLowerCase());
  });

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Welcome to KalaSetu 🎉</h1>
        <p>Discover local skill exchange partners.</p>
      </div>

      {/* SEARCH + BUTTON */}
      <div className="dashboard-actions">
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => navigate("/profile")}>
          Edit Profile
        </button>
      </div>

      {/* REQUESTS */}
      <h2 className="section-title">Incoming Requests</h2>

      <div className="request-grid">
        {requests.length === 0 ? (
          <p>No requests yet</p>
        ) : (
          requests.map((req) => (
            <div key={req._id} className="request-card">
              <p><strong>From:</strong> {req.senderEmail}</p>
              <p><strong>Status:</strong> {req.status}</p>

              <button
                className="accept"
                onClick={() =>
                  updateRequestStatus(req._id, "accepted")
                }
              >
                Accept
              </button>

              <button
                className="reject"
                onClick={() =>
                  updateRequestStatus(req._id, "rejected")
                }
              >
                Reject
              </button>
            </div>
          ))
        )}
      </div>

      {/* USERS */}
      <h2 className="section-title">Available Users</h2>

      <div className="users-grid">
        {filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user._id} className="user-card">

              <h3>{user.name}</h3>
              <p>📍 {user.location || "Not added"}</p>
              <p>{user.bio || "No bio"}</p>

              <p>
                <strong>Offers:</strong>{" "}
                {user.skillsOffered?.join(", ") || "None"}
              </p>

              <p>
                <strong>Wants:</strong>{" "}
                {user.skillsWanted?.join(", ") || "None"}
              </p>

              <button
                className="connect-btn"
                onClick={() => sendRequest(user.email)}
              >
                Connect
              </button>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Dashboard;