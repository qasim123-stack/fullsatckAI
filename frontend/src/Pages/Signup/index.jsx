import React from "react";
import "./Signup.css";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa"; // Import icons
import { MdEmail } from "react-icons/md";
// import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const SignUpPage = () => {
  const navigate=useNavigate();
    // const handleGoogleLogin = useGoogleLogin({
    //     onSuccess: async (tokenResponse) => {
    //       console.log("Google Token:", tokenResponse);
    
          
    //       try {
    //         const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    //           headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
    //         });
    //         console.log("Google User Info:", userInfo.data);
    //         alert(`Welcome ${userInfo.data.name}`);
    //       } catch (error) {
    //         console.error("Error fetching Google user info:", error);
    //       }
    //     },
    //     onError: (error) => {
    //       console.error("Google Login Error:", error);
    //     },
    //   });
    const handlegoogle = async () => {
      try {
        window.location.href = "http://localhost:8800/api/auth/login/google";
        // const response = await axios.get(`http://localhost:8800/api/auth/login/google`);
        // console.log("Response:", response.data);
        // Handle successful response (e.g., redirect)
      } catch (error) {
        console.error("Axios Error:", error.response ? error.response.data : error.message);
      }
    };

  return (
    <div className="container">
      <div className="box">
        {/* Left Section: Image */}
        <div className="image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Image" 
          />
        </div>

        {/* Right Section: Content */}
        <div className="content-wrapper">
          <h1>Sign In</h1>
          <p>Welcome back! Please sign in to continue.</p>
          <button className="signup-btn google">
          <FaGoogle className="icon" />
          Continue with Google
        </button>
        <button className="signup-btn email"onClick={()=>navigate("/manual")}>
          <MdEmail className="icon" />
          Continue with email
        </button> 
        <div className="social-buttons">
          <button className="signup-btn apple"onClick={handlegoogle}>
            <FaApple className="icon" />
            Apple
          </button>
          <span className="p4">OR</span>
          <button className="signup-btn facebook">
            <FaFacebook className="icon" />
            Facebook
          </button>
         </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
