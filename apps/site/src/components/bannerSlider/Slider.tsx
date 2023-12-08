import React, { Component, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Banner } from "@jstemplate/ecommerce-ui";
export default function SyncSlider() {
  {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 5000,
      autoplaySpeed: 10000,
      cssEase: "linear",
    };

    const [active, setActive] = useState(0);
    return (
      <div style={{ overflow: "hidden" }} className=" relative">
        <Slider {...settings}>
          {SliderData.map((singleData: any, index: number) => (
            <div key={index} onFocus={() => setActive(index)}>
              <Banner src={singleData.src} imageHeight={singleData.height} imageWidth={singleData.width} />
            </div>
          ))}
        </Slider>
        {SliderData.map((singleData: any, index: number) => (
          <div key={index} className="absolute bottom-14 w-full flex items-center justify-center gap-2">
            <div className={`h-[5px] w-8 ${active === 0 ? "bg-themePrimary600" : " bg-themeSecondary200"}`}></div>
            <div className={`h-[5px] w-8 ${active === 1 ? "bg-themePrimary600" : " bg-themeSecondary200"}`}></div>
            <div className={`h-[5px] w-8 ${active === 2 ? "bg-themePrimary600" : " bg-themeSecondary200"}`}></div>
          </div>
        ))}
      </div>
    );
  }
}

export const SliderData = [
  {
    src: "/image/banner1.png",
    height: 650,
    width: 553,
    index: 0,
  },
  {
    src: "/image/banner2.png",
    height: 650,
    width: 553,
    index: 1,
  },
  {
    src: "/image/banner1.png",
    height: 650,
    width: 553,
    index: 2,
  },
];
