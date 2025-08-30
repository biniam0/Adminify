import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";

export function ImageSlider({
  images,
}: {
  images: { url: string; name: string }[];
}) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-lg">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        spaceBetween={0}
        slidesPerView={1}
        loop={images.length > 1}
        className="w-full h-full rounded-t-lg guest-house-swiper"
      >
        {images.map((img, idx) => (
          <SwiperSlide
            key={`${img.url}-${idx}`}
            className="relative w-full h-full"
          >
            <Image
              src={img.url}
              alt={img.name || `Guest house image ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              priority={idx === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
