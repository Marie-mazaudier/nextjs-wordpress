import React, { useEffect, useRef } from "react";
import { Placeholder } from "@jstemplate/ecommerce-ui";
import { BodyText } from "@jstemplate/ecommerce-ui";
import { Heading1 } from "@jstemplate/ecommerce-ui";
import { Bloc4SavoirPlus } from "src/types/homeType";
import { Button } from "@jstemplate/ecommerce-ui";
import useFadeIn from "lib/gsap/fadeIn";
import useFadeInUp from "lib/gsap/fadeInUp";
import useVerticalScroll from "lib/gsap/verticalScroll";
import * as DOMPurify from 'dompurify';

interface InfoBijouterieProps {
    infoData: Bloc4SavoirPlus;
}

export const InfoBijouterie: React.FC<InfoBijouterieProps> = ({ infoData }) => {
    /*=============GSAP INITIALISATION===================*/
    // Références pour les éléments que vous souhaitez animer

    useFadeIn({ repeat: true }); // Pour répéter l'animation à chaque fois que l'élément entre dans la vue


    const sanitizedDescription = DOMPurify.sanitize(infoData.descriptionEnSavoirPlus);
    const sanitizedDescription2 = DOMPurify.sanitize(infoData.description2EnSavoirPlus);

    // Nous utilisons un style inline pour l'URL de l'image de fond pour une meilleure lisibilité.
    const styleBackground1 = {
        backgroundImage: `url(${infoData.photoEnSavoirPlus.node.mediaItemUrl})`,
        backgroundSize: 'cover', // pour s'assurer que l'image de fond couvre tout le conteneur
        backgroundPosition: 'center', // pour centrer l'image de fond

    };


    return (
        <div className=" px-2 md:px-20">
            <div className="flex h-full justify-between items-center mx-auto  gap-5 md:gap-10">
                {/* Section */}
                <div className="w-2/3 h-full px-20 flex flex-col justify-center">
                    <h2 className="text-left titre_secondaire">
                        {infoData.titresavoirplus}
                    </h2>
                    <p className="text-left texte_class my-8" dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></p>
                    <h3 className="text-left text-3xl">
                        {infoData.sousTitreEnSavoirPlus}
                    </h3>
                    <p className="text-left texte_class my-8" dangerouslySetInnerHTML={{ __html: sanitizedDescription2 }}></p>

                </div>
                {/* Section */}
                <div className="w-1/3 flex px-20 items-center justify-end	  h-full bg-no-repeat bg-slate-50 bg-center bg-cover" style={styleBackground1}>

                </div>


            </div>
        </div>
    );

};