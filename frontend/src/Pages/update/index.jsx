import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./update.css"



const Success = () => {
const{email}=useParams();

console.log(email);
const [isSeller, setIsSeller] = useState(false)
const [username, setUsername] = useState("");
const handleChange = (event) => {
  setUsername(event.target.value);
  console.log(event.target.value);
  // return event.target.value;
};

const handleSubmit = async(event) => {
  event.preventDefault();

   try {
    const res = await axios.post(`http://localhost:8800/api/auth/update/${email}`, {
      username,
      isSeller,
    }, { 
        
         headers: {
        "Content-Type": "application/json"
        }
    });
    console.log(res.data);
    console.log("sucessfully update the value")
    
} catch (error) {
  console.error("Login error:", error);
  
}
}

return (
  <div className="containerz">
  <div className="form-container">
    <h1 className="form-title">Welcome back</h1>
    <p className="form-subtitle">Please enter your details to sign in</p>

    <form onSubmit={handleSubmit}>
      {/* Username Input First */}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          onChange={handleChange}
          value={username}
          required
        />
      </div>

      {/* Seller Toggle Switch */}
      <div className="form-group">
        <label htmlFor="seller-toggle" className="toggle-label">
          Activate the seller account
          <div className="toggle-switch">
            <input type="checkbox" id="seller-toggle" checked={isSeller} onChange={() => setIsSeller(!isSeller)} />
            <span className="slider"></span>
          </div>
        </label>
      </div>

      <button type="submit">Verify</button>
    </form>
  </div>
  </div>
)
}


export default Success;