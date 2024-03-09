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
import { SliderType } from "src/types/sliderType";
import * as DOMPurify from 'dompurify';
import { getSlickSettings } from "../carousel/slickCarouselSettings";

gsap.registerPlugin(ScrollTrigger);

interface SyncSliderProps {
    className?: string;
    sliderData: SliderType[];
}

export default function SyncSlider({ className, sliderData }: SyncSliderProps) {
    let sliderRef = useRef<Slider | null>(null);

    // Utilisation de la configuration personnalisée pour Slick Carousel
    // avec une modification pour afficher un seul slide à la fois.
    const settings = getSlickSettings(1); // Affiche 1 élément par slide

    return (
        <div className={`relative ${styles.slider_home} ${className}`}>
            <Slider {...settings} ref={(ref) => (sliderRef.current = ref)}>
                {sliderData.map((slider, index) => {
                    const { title, content, sliderChamps } = slider;
                    const backgroundImage = sliderChamps.photoSlider.node.mediaItemUrl;
                    const floatingImage = sliderChamps.imageFlotante.node.mediaItemUrl;
                    const lienBouton = sliderChamps.lienBouton;
                    //  const sanitizedContent = DOMPurify.sanitize(content);

                    return (
                        <div key={index} >
                            <div className="flex flex-row h-screen relative ">
                                <div className="w-1/2 bg-cover bg-center bg-no-repeat " style={{ backgroundImage: `url(${backgroundImage})` }}>


                                </div>
                                <div className="w-1/2 flex flex-col justify-center px-44">
                                    <h1 className="text-5xl mb-4">{title}</h1>
                                    <div className="mb-8" dangerouslySetInnerHTML={{ __html: content }}></div>
                                    <div className="flex justify-left">
                                        <a href={lienBouton} className="px-6 py-2 border inline-flex shrink-0">Découvrir</a>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                                    <img src={floatingImage} alt="Floating" className={`${styles.floatingImage}`} />
                                </div>
                            </div>

                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}