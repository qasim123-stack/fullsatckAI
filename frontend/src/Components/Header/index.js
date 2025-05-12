import React, { useState, useEffect } from "react";
import "./header.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const [isProDropdownOpen, setIsProDropdownOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/auth/checklogin", { withCredentials: true });
  
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
  
    // Run check every 5 seconds to detect logout
    const interval = setInterval(checkLogin, 5000);
  
    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  
  
   
  
  

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Navigation Links */}
        <nav className="nav-links">
          {/* Fiverr Pro Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setIsProDropdownOpen(true)}
            onMouseLeave={() => setIsProDropdownOpen(false)}
          >
            <button className="dropdown-trigger">
              Piper Pro
              <i className="arrow-down">▼</i>
            </button>
            {isProDropdownOpen && (
              <div className="dropdown-content">
                <a href="/pro">Explore Pro Services</a>
                <a href="/pro/apply">Become a Pro Seller</a>
              </div>
            )}
          </div>

          {/* Explore Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setIsExploreDropdownOpen(true)}
            onMouseLeave={() => setIsExploreDropdownOpen(false)}
          >
            <button className="dropdown-trigger">
              Explore
              <i className="arrow-down">▼</i>
            </button>
            {isExploreDropdownOpen && (
              <div className="dropdown-content">
                <a href="">Discover</a>
                <a href="">Guides</a>
                <a href="">Podcast</a>
                <a href="">Blog</a>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section */}
        <div className="right-section">
          {isLoggedIn ? (
            <>
              <a href="" className="nav-link">Dashboard</a>
              {/* <a href="" className="nav-link" onClick={() => setIsLoggedIn(false)}>Logout</a> */}
            </>
          ) : (
            <>
              <a href="" className="nav-link">Become a Seller</a>
              <a href="" className="nav-link" onClick={() => navigate("/login")}>Sign in</a>
              <button className="join-button" onClick={() => navigate("/signup")}>Join</button>
            </>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="headerSearch">
        <input type="text" placeholder="Search gigs" />
        <FaSearch className="search-icon" />
      </div>
    </header>
  );
};

export default Header;
