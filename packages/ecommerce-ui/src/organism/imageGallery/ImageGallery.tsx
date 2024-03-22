import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Placeholder } from "../../atoms/placeholder/Placeholder";

interface MediaItem {
  src: string;
  alt: string;
  type: 'image' | 'video';
  poster?: string;
}

interface ImageGalleryProps {
  media?: MediaItem[];
  discount?: boolean;
}

export const ImageGallery = ({ media, discount }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0); // Utiliser un index pour le média actif
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleViewerToggle = () => setIsViewerOpen(!isViewerOpen);

  const goToNextMedia = () => {
    if (media && activeIndex < media.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const goToPreviousMedia = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const activeMedia = media && media.length > 0 ? media[activeIndex] : null;

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center w-full relative cursor-pointer" onClick={handleViewerToggle}>
          {activeMedia ? (
            activeMedia.type === 'video' ? (
              <video
                controls
                width="480"
                height="480"
                className="rounded-xl"
                poster={activeMedia.poster} // Utiliser l'attribut poster ici
                autoPlay
                loop
                muted
              >
                <source src={activeMedia.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={activeMedia.src} alt={activeMedia.alt} width="480" height="480" className="rounded-xl" />
            )
          ) : (
            <Skeleton height={480} width={480} />
          )}
          {/*discount && (
            <Badge size="md" type="pill" className="absolute top-7 right-7 rounded-full">
              -{discount.toFixed(0)}%
            </Badge>
          )*/}
        </div>
        <div className="flex items-center justify-center gap-2.5 pr-1 overflow-y-auto">
          {media?.map((item, index) => (
            <div
              className={`p-2.5 border-2 w-fit h-fit rounded-[3px] cursor-pointer ${index === activeIndex ? "border-themePrincipal" : "border-themeSecondary200"}`}
              key={index}
              onClick={() => setActiveIndex(index)}
            >
              <Placeholder src={item.type === 'video' ? item.poster || item.src : item.src} imageWidth={60} imageHeight={60} alt={item.alt} className="rounded-xl" />
            </div>
          ))}
        </div>
      </div>
      {isViewerOpen && activeMedia && (
        <div className="fixed inset-0 z-9 flex items-center justify-center p-4 bg-black bg-opacity-75">
          {activeMedia.type === 'video' ? (
            <video controls autoPlay loop muted src={activeMedia.src} className="max-w-full max-h-full" poster={activeMedia.poster}></video>
          ) : (
            <img src={activeMedia.src} alt={activeMedia.alt} className="max-w-full max-h-full" />
          )}
          <button onClick={goToPreviousMedia} className="absolute left-4 top-1/2 text-white text-2xl">&lt;</button>
          <button onClick={goToNextMedia} className="absolute right-4 top-1/2 text-white text-2xl">&gt;</button>
          <button onClick={handleViewerToggle} className="absolute top-4 right-4 text-white text-2xl">&times;</button>
        </div>
      )}
    </>
  );
};
