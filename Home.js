import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

  // ✅ Check login state
  const token = localStorage.getItem("token");

  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <h1>KalaSetu 🎓</h1>
        <p>Connect • Learn • Exchange Skills</p>

        <div className="buttons">

          {!token ? (
            <>
              <Link to="/signup" className="btn primary">
                Signup
              </Link>

              <Link to="/login" className="btn secondary">
                Login
              </Link>
            </>
          ) : (
            <Link to="/dashboard" className="btn primary">
              Go to Dashboard
            </Link>
          )}

        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="features">
        <div className="card">
          <h3>🎯 Learn Skills</h3>
          <p>Find people who can teach you what you want.</p>
        </div>

        <div className="card">
          <h3>🔄 Exchange Skills</h3>
          <p>Offer your skills and learn something new in return.</p>
        </div>

        <div className="card">
          <h3>🤝 Connect</h3>
          <p>Build meaningful connections with learners.</p>
        </div>
      </div>

    </div>
  );
}

export default Home;