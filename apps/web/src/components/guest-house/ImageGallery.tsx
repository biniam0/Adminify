"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

export const ImageGallery = ({
  images,
}: {
  images: { url: string; name: string }[];
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-muted flex items-center justify-center rounded-2xl">
        <span className="text-muted-foreground text-lg">
          No images available
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative w-full h-80 overflow-hidden flex items-center justify-center rounded-2xl">
        <Image
          src={images[selectedImage].url}
          alt={images[selectedImage].name}
          fill
          className="object-contain transition-all duration-300"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto p-2 px-10 hide-scrollbar">
          {images.map((image, idx) => (
            <Button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                selectedImage === idx
                  ? "ring-3 ring-primary scale-105"
                  : "ring-2 ring-muted hover:ring-accent"
              }`}
            >
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover"
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
