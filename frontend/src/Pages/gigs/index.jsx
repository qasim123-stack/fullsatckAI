"use client"

import React, { useEffect, useRef, useState } from "react";
import "./category.css"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useLocation,useNavigate } from "react-router-dom";



export default function AIArtistsMarketplace() {
  const minRef = useRef();
  const maxRef = useRef();
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();


  const [sortBy, setSortBy] = useState("createdAt") 
  const { search }  = useLocation();
  const {data,isLoading,error,refetch}=useQuery({
    queryKey:["gigs",search],
    queryFn:()=>{
       return axios.get(`http://localhost:8800/api/gigs${search}`)
       .then(res=>{
         return res.data;
       })

       .catch(err=>{
        console.log(err);
       })
    }
  })
  console.log(data);

  const Apply = () => {
    refetch();
  }
  const reSort = (type) => {
    setSortBy(type);
    setOpen(false);
  };


  const artists = [
    {
      id: 1,
      name: "Anna Bell",
      image: "https://v0.dev/placeholder.svg?height=400&width=600",
      avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
      description: "I will create ai art character from your images and prompts",
      rating: 5,
      price: 59.99,
    },
    {
      id: 2,
      name: "Lannie Coleman",
      image: "https://v0.dev/placeholder.svg?height=400&width=600",
      avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
      description: "I will create ultra high quality character art with ai",
      rating: 5,
      price: 79.99,
    },
    // Add more artists as needed
  ]

  return (
    <div className="marketplace">
      <nav className="breadcrumb">
        <span>LIVERR</span>
        <span>&gt;</span>
        <span>{data &&data[0]?.cat}</span>
      </nav>

      <h1>{data &&data[0]?.cat}</h1>
      

      <p className="subtitle">Explore the boundaries of art and technology with Liverr's AI artists</p>



      <div className="filters">
        <div className="budget-filter">
          <label>Budget</label>
          <div className="price-inputs">
            <input type="number" placeholder="min" ref={minRef} />
            <input type="number" placeholder="max" ref={maxRef} />
            <button className="apply-btn"onClick={Apply}>Apply</button>
          </div>
        </div>


        <div className="sort">
          <span>Sort by</span>
          <select value={sortBy} onChange={(e) => reSort(e.target.value)}>
            <option>Best Selling</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="artists-grid">
      {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
:
        data.map((gig) => (
          <div key={gig._id} className="artist-card"onClick={()=>{
            navigate(`/gig/${gig._id}`)
          }}>
            <div className="card-image">
              <img src={gig.image || "/placeholder.svg"} alt={`Work by ${gig.name}`} />


            </div>
            <div className="card-content">
              <div className="artist-info">
                <img src={artists.avatar || "/placeholder.svg"} alt={artists.name} className="avatar" />
                <h3>{gig.title}</h3>
              </div>
              <p>{gig.desc}</p>
              <div className="rating">

                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < artists.rating ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
              </div>
              <div className="card-footer">
                <div className="price">
                  <span>STARTING AT</span>
                  <strong>${gig.price.toFixed(2)}</strong>
                </div>
                <button className="heart-btn">♡</button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

