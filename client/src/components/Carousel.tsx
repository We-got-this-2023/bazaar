import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMisc } from "../contexts/MiscContext";

interface CarouselProps {
  images: string[];
  className?: string;
}

export default function Carousel({ images, className }: CarouselProps) {
  const [slidesPerView, setSlidesPerView] = useState(2.75);
  const slideRef = useRef<HTMLImageElement>(null);
  const { isSm } = useMisc();

  useEffect(() => {
    if (isSm) {
      if (window.innerWidth < 640) setSlidesPerView(1.5);
      else setSlidesPerView(2.25);
    } else {
      setSlidesPerView(2.75);
    }
    window.addEventListener("resize", () => {
      const isSm = window.innerWidth < 1000;
      if (isSm)
        if (window.innerWidth < 640) setSlidesPerView(1.5);
        else setSlidesPerView(2);
      else setSlidesPerView(2.75);
    });
  }, []);

  if (images.length <= 3) images = [...images, ...images];

  return (
    <Swiper
      centeredSlides={true}
      spaceBetween={40}
      slidesPerView={slidesPerView}
      loop={true}
      pagination={{ dynamicBullets: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      navigation
      keyboard
      a11y={{ enabled: true }}
      modules={[A11y, Autoplay, Pagination, Keyboard, Navigation]}
      className={`w-full overflow-visible ${className || ""}`}
    >
      {images.map((image, index) => {
        const [name] = image.split(".");
        return (
          <SwiperSlide
            key={name + index}
            className="
            group aspect-[4/3] overflow-hidden 
            shadow-xl transition-transform duration-150 
            hover:scale-110 hover:shadow-2xl 
            max-lg:rounded-[2em] max-sm:rounded-[1em] lg:rounded-[3em]
            "
          >
            <Link to={`/search?q=${name}`}>
              <img
                className="aspect-[4/3] w-full object-cover transition-all duration-200"
                src={`/${image}`}
                alt={`Image of ${name}`}
                ref={slideRef}
              />
              <div className="absolute bottom-0 left-0 right-0 mx-auto flex h-14 w-full items-center justify-center overflow-hidden">
                <div
                  className="
                absolute bottom-0 h-full w-full rounded-md 
                bg-black opacity-30 transition-all duration-200 ease-out 
                group-hover:bottom-1 group-hover:h-2 group-hover:w-[60%]
                "
                />
                <h2
                  className="
                z-10 h-fit w-fit text-xl font-bold capitalize
                text-white transition-all duration-150 
                [text-shadow:_0_0_10px_#000000b0] group-hover:opacity-0"
                >
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
