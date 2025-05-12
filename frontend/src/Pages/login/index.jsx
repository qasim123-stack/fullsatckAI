import React, { useState } from "react";
import "./Loginform.css"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const [error, setError] = useState("");
  const navigate=useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", {
        username,
        password,
      }, { 
           withCredentials: true,
           headers: {
          "Content-Type": "application/json"
          }
      });

      // if (res.data.success) {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        console.log(res.data);
        navigate("/");
      // } else {
      //   setError(res.data.message);
      // }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }

    // Simulated authentication (Replace with actual API call)
    
  };

  return (
    <div className="main">
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center">
        <div className="login-section">
          <h1 className="login-title">Sign In</h1>
          <p className="login-subtitle">Welcome back! Please enter your credentials.</p>

          {error && <p className="error-message">{error}</p>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your Username"
                className="login-input"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="login-input"
              />
            </div>

            <button type="submit" className="login-button" >
              Sign In
            </button>
          </form>

          <p className="signup-text">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
