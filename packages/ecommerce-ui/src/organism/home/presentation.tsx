import React, { useEffect, useRef } from "react";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading1 } from "../../atoms/typography/headingText/heading1";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface PresentationProps {
    src?: string;
}

export const Presentation = ({ src = "/image/h1-img-1.jpg" }: PresentationProps) => {
    const imgRef = useRef(null);

    useEffect(() => {
        const el = imgRef.current;

        // Set up ScrollTrigger with a different scrub value for slower scrolling
        ScrollTrigger.create({
            trigger: el,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: 0.5, // Adjust the scrub value for slower scrolling
        });

        // Animation using gsap.fromTo with the ScrollTrigger
        gsap.fromTo(
            el,
            { y: 0 },
            {
                y: 200, // Adjust the vertical movement distance
                duration: 3,
                scrollTrigger: {
                    trigger: el,
                    scrub: 0.5, // Match the scrub value with the ScrollTrigger scrub value
                },
            }
        );
    }, []);

    return (
        <section className="debut py-28" id="presentation">
            <div className="mx-auto md:w-9/12 lg:w-9/12 xl:w-9/12">
                <div className="relative mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7 justify-items-center px-4 sm:px-0">
                    <div>
                        <Placeholder src={src} imageWidth={1350} imageHeight={1100} className="z-1" />
                        <img src="/image/rectangle-1.jpg" ref={imgRef} className="z-[-1] absolute top-[-80px] left-[-80px] rounded-none w-[500px] h-full" />
                    </div>
                    <div className="container flex flex-col items-center justify-center md:pl-[20%]">
                        <Heading1 className="text-themeSecondary800">
                            LE DOMAINE DE LA ROUILLÈRE test
                        </Heading1>
                        <BodyText size="lg" className="text-themeSecondary600 mt-5">
                            Situé au cœur de la presqu’île de Saint-Tropez, à cheval sur les communes de Gassin et Ramatuelle,
                            le Domaine La Rouillère a été créé en 1900. Il s’étend sur 230 hectares dont 47 de vignes qui bénéficient d’un climat et d’un terroir exceptionnel.
                        </BodyText>
                    </div>
                </div>
            </div>
        </section>
    );
};
