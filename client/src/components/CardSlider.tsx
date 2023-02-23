// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper";

export default function CardSlider({ className }: { className?: string }) {
  const [slidesPerView, setSlidesPerView] = useState(2.75);
  const slideRef = useRef<HTMLImageElement>(null);

  onresize = () => {
    let amount = 2.75;
    if (window.innerWidth < 768) amount = 1.15;
    setSlidesPerView(amount);
    console.log(amount);
  };

  let images = [
    {
      image: "electronics.jpg",
      name: "Electronics",
      link: "/search?q=electronics",
    },
    {
      image: "glassware.jpg",
      name: "Glassware",
      link: "/search?q=glassware",
    },
    {
      image: "apparels.jpeg",
      name: "Clothing",
      link: "/search?q=clothing",
    },
  ];

  if (images.length <= 3) images = [...images, ...images];

  return (
    <Swiper
      centeredSlides={true}
      spaceBetween={40}
      slidesPerView={slidesPerView}
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
      className={`w-full ${className || ""}`}
    >
      {images.map(({ name, image, link }, index) => {
        return (
          <SwiperSlide
            key={name + index}
            className={`aspect-[4/3] overflow-hidden`}
          >
            <Link to={link}>
              <img
                className="aspect-[4/3] w-full object-cover shadow-xl max-lg:rounded-[2em] max-sm:rounded-[1em] lg:rounded-[3em]"
                src={image}
                alt={`Image of ${name}`}
                ref={slideRef}
              />
              <div className="absolute bottom-0 flex w-full justify-center bg-black bg-opacity-30 p-4 max-lg:rounded-b-[2em] max-sm:rounded-b-[1em] lg:rounded-b-[3em]">
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
