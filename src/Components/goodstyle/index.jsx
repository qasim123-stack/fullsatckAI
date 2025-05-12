"use client"

import { ChevronRight } from "lucide-react"
// import Image from "next/image"
import { useRef } from "react"
import "./style.css"

const services = [
  {
    title: "Website Development",
    color: "#0e6e3a",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BboX8OdFMBfPcyadckTmtRLkgemn5t.png",
  },
  {
    title: "Logo Design",
    color: "#FF7F50",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BboX8OdFMBfPcyadckTmtRLkgemn5t.png",
  },
  {
    title: "SEO",
    color: "#0a3311",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BboX8OdFMBfPcyadckTmtRLkgemn5t.png",
  },
  {
    title: "Architecture & Interior Design",
    color: "#800020",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BboX8OdFMBfPcyadckTmtRLkgemn5t.png",
  },
  {
    title: "Social Media Marketing",
    color: "#808000",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BboX8OdFMBfPcyadckTmtRLkgemn5t.png",
  },
  {
    title: "Voice Over",
    color: "#654321",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BboX8OdFMBfPcyadckTmtRLkgemn5t.png",
  },
  {
    title: "UGC",
    color: "#d53f8c",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BboX8OdFMBfPcyadckTmtRLkgemn5t.png",
  },
]

export default function PopularServices() {
  const scrollContainerRef = useRef(null)

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      })    
    }
  }

  return (
    <section className="services-section">
      <div className="container">
        <h2 className="section-title">Popular services</h2>
        <div className="services-container">
          <div ref={scrollContainerRef} className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card" style={{ backgroundColor: service.color }}>
                <h3 className="service-title">{service.title}</h3>
                <div className="image-container">
                  <div className="image-wrapper">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="service-image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={scrollRight} className="scroll-button" aria-label="Scroll right">
            <ChevronRight className="scroll-icon" />
          </button>
        </div>
      </div>
    </section>
  )
}


