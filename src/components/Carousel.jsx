import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.css";

function Carousel() {
  return (
    <section className="simple-carousel-section">
      <div className="container-fluid">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="simple-swiper"
        >
          <SwiperSlide>
            <div className="simple-slide">
              <img
                src="/images/apex-hair.png"
                alt="Apex Hair"
                className="simple-slide-img"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="simple-slide">
              <img
                src="/images/auradaily.png"
                alt="Aura Daily"
                className="simple-slide-img"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="simple-slide">
              <img
                src="/images/fortify-beard.png"
                alt="Fortify Beard"
                className="simple-slide-img"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default Carousel;