// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper";

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
      className="p-10"
    >
      {images.map((item, index) => {
        return (
          <SwiperSlide
            key={item.name + index}
            className="aspect-[4/3] overflow-hidden rounded-[3em]"
          >
            <img
              className="aspect-[4/3] w-full rounded-[3em] object-cover shadow-xl"
              src={item.image}
              alt={`Image of ${item.name}`}
            />
            <div className="absolute bottom-0 flex w-full justify-center bg-black bg-opacity-30 p-4">
              <h2 className="relative text-xl font-bold text-white [text-shadow:_0_0_10px_#000000b0]">
                {item.name}
              </h2>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
