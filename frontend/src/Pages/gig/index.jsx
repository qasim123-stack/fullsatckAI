"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, Clock, RefreshCw, ChevronDown } from "lucide-react"
import "./gig.css"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom"
import Reviews from "../../Components/reviews/Reviews.jsx"



export default function WordPressService() {
  const [activePackage, setActivePackage] = useState("basic")
  const {id}=useParams();
  const {data,isLoading,error,refetch}=useQuery({
    queryKey:["gig"],
    queryFn:()=>{
       return axios.get(`http://localhost:8800/api/gigs/${id}`)
       .then(res=>{
         return res.data;
       })


       .catch(err=>{
        console.log(err);
       })
    }
  })
  console.log(data);
  if(isLoading) return "loading";
  if(error) return "Something went wrong!";
  const contactseller=()=>{
    window.open("https://wa.me/923333333333?text=Hi%20I%20am%20interested%20in%20your%20service");
  }


  return (
  
    <div className="service-container">
      <div className="main-content">
        <div className="service-header">
          <h1 className="service-title">{data?.title}</h1>

          <div className="profile-section">
            <img src="/placeholder.svg?height=48&width=48" alt="Profile" className="profile-image" />
            <div className="profile-info">
              <div className="profile-name">
                {data.username}
                <span className="fiverr-choice">Fiverr's Choice</span>
                <span className="top-rated">Top Rated</span>
              </div>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="star" size={16} fill="currentColor" />
                ))}
                <span>4.9</span>
                <span>(352 reviews)</span>
              </div>
            </div>
          </div>
          <div className="queue-info">28 orders in queue</div>
        </div>

        <div className="carousel">
          <img
            src="https://images.unsplash.com/photo-1738447429433-69e3ecd0bdd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="WordPress Website Design"
            className="main-image"
          />
          <div className="carousel-nav">
            <button className="nav-button">
              <ChevronLeft size={20} />
            </button>
            <button className="nav-button">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
           <div className="description-section">
        <h2 className="description-title">About This Agent</h2>
        <div className="description-content">
          <p>{data?.desc}</p>
        </div>
      </div>
      <Reviews gigId={id} />
      </div>
 
      {/* <div className="description-section">
        <h2 className="description-title">About This Agent</h2>
        <div className="description-content">
          <p>{data?.des}</p>
        </div>
      </div> */}

      <div className="sidebar">
        <div className="package-tabs">
          <button
            className={`package-tab ${activePackage === "basic" ? "active" : ""}`}
            onClick={() => setActivePackage("basic")}
          >
            Basic
          </button>
          <button
            className={`package-tab ${activePackage === "standard" ? "active" : ""}`}
            onClick={() => setActivePackage("standard")}
          >
            Standard
          </button>
          <button
            className={`package-tab ${activePackage === "premium" ? "active" : ""}`}
            onClick={() => setActivePackage("premium")}
          >
            Premium
          </button>
        </div>

        <div className="package-content">
          <h3 className="package-title">Kickstarter: Landing Page</h3>
          <div className="package-price">${data?.price}</div>
          <p className="package-description">
            Home/Landing Page + Errors Fix + Speed Optimization + Branding + Contact
          </p>

          <div className="delivery-info">
            <div className="delivery-item">
              <Clock size={16} />
              <span>4-day delivery</span>
            </div>
            <div className="delivery-item">
              <RefreshCw size={16} />
              <span>Unlimited Revisions</span>
            </div>
          </div>

          <div className="whats-included">
            <div className="whats-included-header">
              <span>What's Included</span>
              <ChevronDown size={16} />
            </div>
          </div>

          <button className="continue-button">Continue →</button>

          <button className="contact-button"onClick={contactseller}>Contact me</button>

          <a href="#" className="compare-link">
            Compare packages
          </a>
        </div>
      </div>
    </div>
  )
}