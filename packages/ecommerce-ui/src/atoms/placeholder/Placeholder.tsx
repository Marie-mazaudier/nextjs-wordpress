import Image from "next/legacy/image";
import React, { FC } from "react";
import { gsap } from 'gsap';


export interface PlaceholderProps {
  src: string;
  imageWidth?: number;
  imageHeight?: number;
  alt?: string;
  className?: string;
}

export const Placeholder: FC<PlaceholderProps> = ({ src, imageHeight, alt = "image", imageWidth, className }) => {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        layout="intrinsic"
        objectFit="cover"
        priority={true}
        className={`${className}`}
      />
    </>
  );
};
