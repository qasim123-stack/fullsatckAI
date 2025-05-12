"use client"
import "./index.css"
import { useNavigate } from "react-router-dom";

export default function RegistrationError() {
    const navigate = useNavigate();
  const handleTryAgain = () => {
    navigate("/manual")
    
    console.log("Try again clicked")
    // Example: router.push('/register')
  }

  return (
    <div className="registration-error-wrapper">
      <div className="registration-error-card">
        <div className="registration-error-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        <div className="registration-error-header">
          <h2>Registration Unsuccessful</h2>
          <p>We couldn't complete your registration due to bad credentials.</p>
        </div>

        <div className="registration-error-details">
          <p>Please check your information and try again. Make sure all required fields are filled correctly.</p>
        </div>

        <div className="registration-error-button-container">
          <button onClick={handleTryAgain} className="registration-error-button">
            Try Again
          </button>
        </div>

        <div className="registration-error-help-container">
          <p>
            Need help?{" "}
            <a href="#" className="registration-error-help-link">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
