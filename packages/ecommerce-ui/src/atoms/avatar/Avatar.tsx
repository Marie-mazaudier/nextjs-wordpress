import React, { FC } from "react";
import { cva } from "class-variance-authority";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const AvatarStyle = cva(["rounded-full"], {
  variants: {
    size: {
      sm: ["w-8", "h-8"],
      md: ["w-9", "h-9"],
      lg: ["w-10", "h-10"],
      xl: ["w-12", "h-12"],
      xxl: ["w-14", "h-14"],
      xxxl: ["w-16", "h-16"],
    },
    defaultVariants: {
      size: "md",
    },
  },
});

export interface AvatarProps {
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  src?: any;
  alt?: any;
}

export const Avatar: FC<AvatarProps> = ({ size='md', src, alt }) => {
  return (
    <div className={`relative ${AvatarStyle({ size })}`}>
      {src?.length > 0 ? (
        <Image src={src} alt={alt?alt:"image"} fill={true} priority={true} />
      ) : (
        <Skeleton height={50} width={50} circle={true} />
      )}
    </div>
  );
};

