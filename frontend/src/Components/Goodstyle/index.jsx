"use client"

import { ChevronRight } from "lucide-react"
// import Image from "next/image"
import { useRef } from "react"
import "./style.css"
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Graphic design",
    color: "#A020F0",
    image: "https://cdn.qwenlm.ai/output/1df68353-c8e8-4c77-8583-bb6002972897/t2i/a4510940-a904-4861-bd96-4617b7fd4838/5dc0ebf3-8ccc-493e-9d7a-ddad5907b15d.png",
    cat:"design"
  },
  {
    title: "Marketing",
    color: "#FF7F50",
    image: "https://cdn.qwenlm.ai/output/1df68353-c8e8-4c77-8583-bb6002972897/t2i/bbc7aacd-ee4d-4fd8-8979-261361cd5465/9a23921f-711b-49f9-823f-821175606c99.png",
  },
  {
    title: "Customer Support",
    color: "#5F9EA0",
    image: "https://cdn.qwenlm.ai/output/1df68353-c8e8-4c77-8583-bb6002972897/t2i/73492e5d-165f-4948-9e08-7ddf87ad6bfa/aa6091c3-1b4e-4c8a-82a7-ccef7737aeac.png",
  },
  {
    title: "Data Analysis",
    color: "#800020",
    image: "https://cdn.qwenlm.ai/output/1df68353-c8e8-4c77-8583-bb6002972897/t2i/c50d090a-444e-4809-aa57-12a5870cbdad/6be23944-a488-45d1-acab-2259940cce31.png",
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
  const navigate=useNavigate();

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
        <h2 className="section-title">Popular Services</h2>
        <div className="services-container">
          <div ref={scrollContainerRef} className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card" style={{ backgroundColor: service.color }}onClick={()=>{
                navigate(`/gigs?cat=${service.cat}`)
              }}>
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


