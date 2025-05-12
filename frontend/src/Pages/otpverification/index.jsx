"use client"

import { useState, useRef } from "react"
import "./otp-verification.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function OTPVerification() {
  const [otp, setOtp] = useState(Array(6).fill(""))
  const inputRefs = useRef([])
  const { email } = useParams();
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    const value = element.value
   
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value.substring(value.length - 1)
      setOtp(newOtp)

      // Move to next input if current field is filled
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content contains only numbers
    if (/^\d+$/.test(pastedData)) {
      const otpArray = pastedData.split("").slice(0, 6)
      const newOtp = [...otp]

      otpArray.forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit
        }
      })

      setOtp(newOtp)

      // Focus the next empty input or the last input if all are filled
      const nextEmptyIndex = newOtp.findIndex((val) => val === "")
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus()
      } else {
        inputRefs.current[5]?.focus()
      }
    }
  }

  const handleSubmit = async() => {
    const otpValue = otp.join("")
    console.log("OTP submitted:", otpValue)
    // Add your verification logic here
    try{
      const verifyotp= await axios.post('http://localhost:8800/api/auth/verifyotp', {email: email, otp: otpValue});
      console.log(verifyotp.data);
      navigate("/")


      
    }
    catch(error){
      console.log(error);
    }
  }
  const resendotp= async()=>{
    try{
        const resend = await axios.post("http://localhost:8800/api/auth/sendmail", {
           email:email
        });
        
        

      }
      catch(error){
      console.log(error);
    }
  }
          
        



  return (
    <div className="otp-verification-wrapper">
      <div className="otp-verification-card">
        <div className="otp-verification-header">
          <h2>VERIFICATION</h2>
          <p>Please enter the verification code sent to your device</p>
        </div>

        <div className="otp-verification-form">
          <div className="otp-verification-inputs-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="otp-verification-input"
              />
            ))}
          </div>

          <div className="otp-verification-button-container">
            <button
              onClick={handleSubmit}
              className="otp-verification-submit-button"
              disabled={otp.some((digit) => digit === "")}
            >
              Verify
            </button>
          </div>

          <div className="otp-verification-resend-container">
            <p>
              Didn't receive a code?{" "}
              <a href="#" className="otp-verification-resend-link" onClick={resendotp}>
                Resend
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
