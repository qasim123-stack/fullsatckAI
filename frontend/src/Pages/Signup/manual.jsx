"use client"
import axios from "axios";
import { useState } from "react"
import "./manual.css"
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload";
import { useMutation } from "@tanstack/react-query";
import countries from "../../Components/data/countries";

import Select from "react-select";







export default function RegistrationForm() {
  const [isSeller, setIsSeller] = useState(false)
 
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });
  const navigate = useNavigate();
  const countryOptions = countries.map((country) => ({
    label: country,
    value: country
  }));
  
  const validateForm = () => {
    if (!user.email.includes("@")) {
      alert("Please enter a valid email.");
      return false;
    }
    if (user.phone && user.phone.length < 10) {
      alert("Please enter a valid phone number.");
      return false;
    }
    return true;
  }
  

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const url = await upload(file);
  
    try {
      // Register the user
      const regist = await axios.post("http://localhost:8800/api/auth/register", {
        ...user,
        img: url,
      });
  
      if (regist.status === 200 || regist.status === 201) {
        // Send verification email

        try {
           navigate("/otpverification/${user.email}");
          const emailssend = await axios.post("http://localhost:8800/api/auth/sendmail", {
            email: user.email,
          });
  
         
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
          navigate("/regerror");
        }
      } else {
        console.error("Registration failed with status", regist.status);
        navigate("/regerror");
      }
    } catch (regError) {
      console.error("Registration failed:", regError);
      navigate("/regerror");
    }
  };
  
    
      


  return (
    <div className="registration-container">
      <div className="form-column">
        <h2>Create a new account</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="johnDoe" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="email" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="profile-picture">Profile Picture</label>
            <input type="file" id="profile-picture" onChange={(e) => setFile(e.target.files[0])}/>
          </div>
          <div className="form-group">
  <label htmlFor="country">Country</label>
  <Select
    options={countryOptions}
    onChange={(selectedOption) =>
      setUser((prev) => ({ ...prev, country: selectedOption.value }))
    }
    placeholder="Select your country"
    className="react-select-container"
    classNamePrefix="react-select"
  />
</div>

          <button type="submit" className="register-button" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </div>
      <div className="form-column">
       
        <div className="form-group">
          <label htmlFor="seller-toggle" className="toggle-label">
            Activate the seller account
            <div className="toggle-switch">
              <input type="checkbox" id="seller-toggle" checked={isSeller} onChange={() => setIsSeller(!isSeller)} />
              <span className="slider"></span>
            </div>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="+1 234 567 85" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="desc" placeholder="A short description of yourself" rows={5} onChange={handleChange}></textarea>
        </div>
      </div>
    </div>
  )
}

