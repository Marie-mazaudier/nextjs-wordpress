import React, { useEffect, useRef } from "react";
import { Placeholder } from "@jstemplate/ecommerce-ui";
import { BodyText } from "@jstemplate/ecommerce-ui";
import { Heading1 } from "@jstemplate/ecommerce-ui";
import { Bloc1 } from "src/types/homeType";
import { Button } from "@jstemplate/ecommerce-ui";
import useFadeIn from "lib/gsap/fadeIn";
import useFadeInUp from "lib/gsap/fadeInUp";
import useVerticalScroll from "lib/gsap/verticalScroll";
interface PresentationSiteProps {
    infoData: Bloc1;
}

export const PresentationSite: React.FC<PresentationSiteProps> = ({ infoData }) => {
    /*=============GSAP INITIALISATION===================*/
    // Références pour les éléments que vous souhaitez animer
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    useFadeIn({ repeat: true }); // Pour répéter l'animation à chaque fois que l'élément entre dans la vue

    // Options pour l'animation de défilement vertical
    const verticalScrollOptions = {
        fromY: 50,
        toY: 0, // Vous pouvez ajuster la distance de déplacement vertical ici
        duration: 3,
        start: "top 50%",
        end: "bottom 50%",
        scrub: 0.5
    };

    // Initialisation des animations avec les hooks créés
    const animateBackground = useVerticalScroll(contentRef, verticalScrollOptions);

    // Appliquer les animations sur les éléments
    React.useEffect(() => {
        animateBackground();

    }, [animateBackground]);


    // Nous utilisons un style inline pour l'URL de l'image de fond pour une meilleure lisibilité.
    const styleBackground = {
        backgroundImage: `url(${infoData.photoArrierePlan.node.mediaItemUrl})`,
        backgroundSize: 'cover', // pour s'assurer que l'image de fond couvre tout le conteneur
        backgroundPosition: 'center', // pour centrer l'image de fond
        backgroundAttachment: 'fixed',
    };


    return (
        <div className=" h-[80vh] px-2 md:px-20">
            <div className=" mx-auto h-full" style={styleBackground}>
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="text-center w-3/5 p-10 bg-white bg-opacity-90 fade-in" >
                        <Heading1>{infoData.titreDuSite}</Heading1>
                        <BodyText size="lg" className="mt-2 mb-4 ">{infoData.descriptionDuSite}</BodyText>
                        <Button className="mt-4">{infoData.boutonPopup}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};