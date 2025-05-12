import React, { useState } from "react";
import { Search } from "lucide-react";
import "./indes.css"; // Ensure this file contains necessary styles
import  Section from "../../Components/Goodstyle";
import { useNavigate } from "react-router-dom";


import {Typewriter} from 'react-simple-typewriter';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/gigs?cat=${searchQuery}`);
  };

  return (
    


    <div className="main">
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        {/* <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b0d64f2b-80e3-4a06-82f4-4a8f4baf5643-dJAMDCpv7Ek0470rCBqxKhBliS7H93.gif"
          alt="AI Agent Collaboration"
          className="w-full h-full object-cover"
        /> */}
      </div>

      {/* Content */}
      <div className="hero-section">
      <h1 className="hero-title">
        <Typewriter words={[" Find the Perfect AI Agent for Your Project"]}
        loop={true}
        cursor
        cursorStyle="|"
        typeSpeed={150}
        deleteSpeed={150}
        />
       </h1>
       
       <p className="hero-subtitle">
        Connect with advanced AI agents and their developers to bring your ideas to life
       </p>

        {/* Search Bar */}
        <div className="search-container">
        <Search className="search-icon" />
       <input
        type="text"
       placeholder="Search AI Agents..."
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
       />
        <button className="search-button"onClick={handleSearch}>Search</button>

       
         
        </div>

      </div>
    </div>
    <Section></Section>
    </div>
  );
};

export default Home;
