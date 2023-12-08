// Importez vos fichiers CSS et SVG appropriés
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Slide } from "@jstemplate/ecommerce-ui";
import styles from "../../../styles/slider-arrows.module.scss";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { gsap } from 'gsap';
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

// PrevArrow component
const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div className={`${className} ${styles.prevArrow}`} onClick={onClick}>
            <img src="/svg/angle-left-svgrepo-com.svg" alt="Previous" />
        </div>
    );
};

// NextArrow component
const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div className={`${className} ${styles.nextArrow}`} onClick={onClick}>
            <img src="/svg/angle-right-svgrepo-com.svg" alt="Next" />
        </div>
    );
};
interface SyncSliderProps {
    className?: string;
}

export default function SyncSlider({ }: SyncSliderProps) {
    const imgRef = useRef(null);
    useEffect(() => {
        const el = imgRef.current;
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 3 });
    }, []);
    const [active, setActive] = useState(0);

    const changeSlide = (index: number) => {
        setActive(index);
        sliderRef?.slickGoTo(index);  // Utilisez slickGoTo pour changer le slide
    };

    let sliderRef: any;  // Ajoutez une référence pour accéder au composant Slider

    const settings = {
        dots: false,  // Définissez à false pour désactiver les points de navigation
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <div style={{ overflow: "hidden" }} className="relative mt-[-170px]  " ref={imgRef}>
            <Slider {...settings} ref={(slider) => (sliderRef = slider)} className="z-20">
                {SliderData.map((singleData: any, index: number) => (
                    <div key={index} onFocus={() => changeSlide(index)}>
                        <Slide src={singleData.src} imageHeight={singleData.height} imageWidth={singleData.width} />
                    </div>
                ))}
            </Slider>

            <div className="absolute bottom-14 w-full z-[99] flex items-center justify-center gap-2">
                {SliderData.map((singleData: any, index: number) => (
                    <div
                        key={index}
                        className={`h-[5px] w-8 cursor-pointer ${active === index ? "bg-themePrimary600" : " bg-themeSecondary200"}`}
                        onClick={() => changeSlide(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export const SliderData = [
    {
        src: "/image/ales-maze-z0bACVUDTJM-unsplash.jpg",
        height: 100,
        width: 100,
    },
    {
        src: "/image/jesse-belleque-knK9r-TUhjw-unsplash.jpg",
        height: 100,
        width: 100,
    },
    {
        src: "/image/rodrigo-abreu-Cj4CWKQllOM-unsplash.jpg",
        height: 100,
        width: 100,
    },
];
