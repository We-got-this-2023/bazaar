import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Pagination } from "swiper";

export default function CardSlider() {
  let images = [
    {
      image: "electronics.jpg",
      name: "Electronics",
    },
    {
      image: "glassware.jpg",
      name: "Glassware",
    },
    {
      image: "apparels.jpeg",
      name: "Clothing",
    },
  ];

  if (images.length <= 3) {
    images = [...images, ...images];
  }

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        modules={[Pagination]}
        className="mySwiper flex h-96"
      >
        {images.map((item) => {
          return (
            <SwiperSlide className="">
              <img
                src={item.image}
                className="relative h-72 w-96 rounded-3xl object-cover"
                alt=""
              />
              <div className="absolute bottom-24 h-20 w-full max-w-sm rounded-b-3xl bg-black bg-opacity-50">
                <h2 className="items-centers mt-5 flex justify-center bg-transparent text-2xl text-white">
                  {item.name}
                </h2>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

{
  /* <SwiperSlide>
<img
  src="apparels.jpeg"
  className="relative h-64 w-96 rounded-3xl object-cover"
  alt=""
/>
<div className="absolute bottom-32 h-20 w-full rounded-b-3xl bg-black bg-opacity-50">
  <h2 className="items-centers mt-5 flex justify-center bg-transparent text-2xl text-white">
    Clothing & Apparel
  </h2>
</div>
</SwiperSlide>
<SwiperSlide>
<img
  src="electronics.jpg"
  className="relative h-64 w-96 rounded-3xl object-cover"
  alt=""
/>
<div className="absolute bottom-32 h-20 w-full rounded-b-3xl bg-black bg-opacity-50">
  <h2 className="items-centers mt-5 flex justify-center bg-transparent text-2xl text-white">
    Electronics
  </h2>
</div>
</SwiperSlide>
<SwiperSlide>
<img
  src="glassware.jpg"
  className="relative h-64 w-96 rounded-3xl object-cover"
  alt=""
/>
<div className="absolute bottom-32 h-20 w-full rounded-b-3xl bg-black bg-opacity-50">
  <h2 className="items-centers mt-5 flex justify-center bg-transparent text-2xl text-white">
    Glassware
  </h2>
</div>
</SwiperSlide>
<SwiperSlide>Slide 4</SwiperSlide>
<SwiperSlide>Slide 5</SwiperSlide>
<SwiperSlide>Slide 6</SwiperSlide>
<SwiperSlide>Slide 7</SwiperSlide>
<SwiperSlide>Slide 8</SwiperSlide>
<SwiperSlide>Slide 9</SwiperSlide> */
}
