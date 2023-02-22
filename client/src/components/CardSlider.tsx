// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Link } from "react-router-dom";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper";

export default function CardSlider({ className }: { className?: string }) {
  let images = [
    {
      image: "electronics.jpg",
      name: "Electronics",
      link: "/search/query=electronics",
    },
    {
      image: "glassware.jpg",
      name: "Glassware",
      link: "/search/query=glassware",
    },
    {
      image: "apparels.jpeg",
      name: "Clothing",
      link: "/search/query=clothing",
    },
  ];

  if (images.length <= 3) images = [...images, ...images];

  return (
    <Swiper
      centeredSlides={true}
      spaceBetween={40}
      slidesPerView={3}
      loop={true}
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      navigation
      keyboard
      a11y={{ enabled: true }}
      modules={[A11y, Autoplay, Pagination, Keyboard, Navigation]}
      className={`w-full p-10 ${className || ""}`}
    >
      {images.map(({ name, image, link }, index) => {
        return (
          <SwiperSlide
            key={name + index}
            className="aspect-[4/3] overflow-hidden rounded-[3em]"
          >
            <Link to={link}>
              <img
                className="aspect-[4/3] w-full rounded-[3em] object-cover shadow-xl"
                src={image}
                alt={`Image of ${name}`}
              />
              <div className="absolute bottom-0 flex w-full justify-center bg-black bg-opacity-30 p-4">
                <h2 className="relative text-xl font-bold text-white [text-shadow:_0_0_10px_#000000b0]">
                  {name}
                </h2>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
