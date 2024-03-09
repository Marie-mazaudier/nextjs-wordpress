import React, { useEffect, useRef } from "react";
import { Placeholder } from "@jstemplate/ecommerce-ui";
import { BodyText } from "@jstemplate/ecommerce-ui";
import { Heading1 } from "@jstemplate/ecommerce-ui";
import { Bloc3Bijoux } from "src/types/homeType";
import { Button } from "@jstemplate/ecommerce-ui";
import useFadeIn from "lib/gsap/fadeIn";
import useFadeInUp from "lib/gsap/fadeInUp";
import useVerticalScroll from "lib/gsap/verticalScroll";
import * as DOMPurify from 'dompurify';

interface PresentationBijouxProps {
    infoData: Bloc3Bijoux;
}

export const PresentationBijoux: React.FC<PresentationBijouxProps> = ({ infoData }) => {
    /*=============GSAP INITIALISATION===================*/
    // Références pour les éléments que vous souhaitez animer

    useFadeIn({ repeat: true }); // Pour répéter l'animation à chaque fois que l'élément entre dans la vue


    const sanitizedDescription = DOMPurify.sanitize(infoData.descriptionBijoux);

    // Nous utilisons un style inline pour l'URL de l'image de fond pour une meilleure lisibilité.
    const styleBackground1 = {
        backgroundImage: `url(${infoData.photoBijoux.node.mediaItemUrl})`,
        backgroundSize: 'cover', // pour s'assurer que l'image de fond couvre tout le conteneur
        backgroundPosition: 'center', // pour centrer l'image de fond

    };


    return (
        <div className=" h-[70vh] px-2 md:px-20">
            <div className="flex h-full justify-between items-center mx-auto  gap-5 md:gap-10">
                {/* Section pour les montres pour dames */}
                <div className="w-1/2 flex px-20 items-center justify-end	  h-full bg-no-repeat bg-slate-50 bg-center bg-cover" style={styleBackground1}>

                </div>

                {/* Section pour les montres pour hommes */}
                <div className="w-1/2 h-full px-20 flex flex-col justify-center">
                    <h2 className="text-left titre_secondaire">
                        {infoData.titreBijoux}
                    </h2>
                    <p className="text-left texte_class my-8" dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></p>
                    <Button> {infoData.boutonBijoux}</Button>

                </div>
            </div>
        </div>
    );

};