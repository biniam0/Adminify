import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";

export function ImageSlider({
  images,
}: {
  images: { url: string; name: string }[];
}) {
  return (
    <div className="m-2">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        className="h-48"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="relative w-full h-48">
            <Image
              src={img.url}
              alt={img.name}
              fill
              className="object-cover rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
