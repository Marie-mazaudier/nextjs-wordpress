import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Badge } from "../../atoms/badges/Badge";
import { Placeholder } from "../../atoms/placeholder/Placeholder";

interface ImageGalleryProps {
  images?: any;
  discount?: any;
}

export const ImageGallery = ({ images, discount }: ImageGalleryProps) => {
  const [active, setActive] = useState(0);
  const [image, setImage] = useState("");
  return (
    <div className="flex gap-5">
      <div
        className={`flex flex-col items-center justify-center gap-2.5 pr-1 scrollBar ${images && "overflow-y-auto"}`}
      >
        {images
          ? images?.map((image: any, index: number) => (
              <div
                className={`p-2.5 border-2  w-fit h-fit rounded-[20px] cursor-pointer ${
                  active === index ? "border-themePrimary600" : "border-themeSecondary200"
                }`}
                key={index}
                onClick={() => {
                  setImage(image?.src);
                  setActive(index);
                }}
              >
                <div className="hidden sm:block">
                  <Placeholder
                    src={image?.src}
                    imageWidth={100}
                    imageHeight={100}
                    alt={image?.alt}
                    className="rounded-xl"
                  />
                </div>
                <div className="block sm:hidden">
                  <Placeholder
                    src={image?.src}
                    imageWidth={50}
                    imageHeight={50}
                    alt={image?.alt}
                    className="rounded-xl"
                  />
                </div>
              </div>
            ))
          : [1, 2, 3, 4].map((_, index) => <Skeleton key={index} height={120} width={100} />)}
      </div>
      <div className={`p-7 bg-themeSecondary100 rounded-xl relative ${images ? "w-fit" : "w-full"}`}>
        {images ? (
          <Placeholder src={image ? image : images[0]?.src} imageWidth={480} imageHeight={480} />
        ) : (
          <Skeleton height={480} />
        )}
        {discount ? (
          <>
            <Badge size="md" type="pill" className="absolute top-7 right-7 rounded-full">
              -{discount?.toFixed(0)}%
            </Badge>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
