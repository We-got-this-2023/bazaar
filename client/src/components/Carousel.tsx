import { HTMLAttributes } from "react";
import {
  A11y,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

interface CarouselProps extends SwiperProps {
  images: string[];
  className?: string;
  props?: SwiperProps & HTMLAttributes<HTMLDivElement>;
}

export default function Carousel({
  images,
  className,
  ...props
}: CarouselProps) {
  if (!images.length) throw new Error("No images provided to Carousel.tsx");
  while (images.length < 4) images = [...images, ...images];

  return (
    <Swiper
      centeredSlides={true}
      spaceBetween={100}
      slidesPerView={2.25}
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
      modules={[A11y, Autoplay, Pagination, Keyboard, Navigation, Scrollbar]}
      className={"p-10 " + className ?? ""}
      {...props}
    >
      {images.map((img, index) => {
        const name = img.split(".")[0].replace(/[./-_]/, "");
        return (
          <SwiperSlide
            key={name + index}
            className="overflow-hidden rounded-[3em]"
          >
            <img
              className="aspect-[12/7] w-full rounded-[3em] object-cover shadow-xl"
              src={img}
              alt={`Image of ${name}`}
            />
            <div className="absolute bottom-0 flex w-full justify-center bg-black bg-opacity-30 p-4">
              <h2 className="relative text-xl font-bold capitalize text-white [text-shadow:_0_0_10px_#000000b0]">
                {name}
              </h2>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
