import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useNavigate } from "react-router-dom";
import "./ProductSlider.css"


function ProductSlider() {
    const navigate = useNavigate();
    const products = [
        {
            id: 1,
            name: "Apex Hair Support",
            image: "/images/apex-hair.png",
        },
        {
            id: 2,
            name: "Aura Daily Wellness",
            image: "/images/auradaily.png",
        },
        {
            id: 3,
            name: "Fortify Beard Support",
            image: "/images/fortify-beard.png",
        },
        {
            id: 4,
            name: "Somnus Rest Support",
            image: "/images/somnusrest.png",
        },
        {
            id: 5,
            name: "Lean Fit Weight Support",
            image: "/images/auradaily.png",
        },
         {
            id: 6,
            name: "Fortify Beard Support",
            image: "/images/fortify-beard.png",
        },
        {
            id: 7,
            name: "Somnus Rest Support",
            image: "/images/somnusrest.png",
        },
        {
            id: 8,
            name: "Lean Fit Weight Support",
            image: "/images/auradaily.png",
        },
    ]

    return (
        <section className="product-slider-section" >
            <div className="container-fluid px-4" >
                <div className="section-heading text-center">
                    <h2>Wellness Products</h2>
                </div>
                <Swiper
                    modules={[Autoplay, FreeMode]}
                    loop={true}
                    freeMode={true}
                    slidesPerView="auto"
                    spaceBetween={24}
                    speed={4500}
                    allowTouchMove={false}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    className="product-swiper"
                >
                    {products.map((product, index) => (
                        <SwiperSlide className="product-slide" key={`${product.id}`}>
                            <div className="product-card" onClick={() => navigate(`product/${product.id}`)}>

                                <div className="product-img-box">
                                    <img src={product.image} alt={product.name} />
                                </div>


                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default ProductSlider;