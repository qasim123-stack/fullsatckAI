"use client"

import { useState, useEffect } from "react"
import "./scrollnav.css"

function ScrollNav() {
//   const [visible, setVisible] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       // Show nav when scrolled down more than 100px
//       const scrolled = window.scrollY >100; 
//       setVisible(scrolled);
//     };

//     // Add scroll event listener
//     window.addEventListener("scroll", handleScroll);

//     // Clean up the event listener
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

  return (
    <nav className="scroll-nav">
      <div className="container nav-container">
        <div className="nav-left">
         

          <div className="nav-linkz">
            <a href="#" className="nav-linkk">
              Graphics & Design
            </a>
            <a href="#" className="nav-linkk">
              Programming & Tech
            </a>
            <a href="#" className="nav-linkk">
              Digital Marketing
            </a>
            <a href="#" className="nav-linkk">
              Video & Animation
            </a>
            <a href="#" className="nav-linkk">
              Business
            </a>
            <a href="#" className="nav-linkk">
              Lifestyle
            </a>
          </div>
        </div>

        <div className="nav-right">
       
        </div>
      </div>
    </nav>
  )
}

export default ScrollNav

