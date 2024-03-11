import React, { useEffect, useRef, useState } from "react";
import { Bloc4SavoirPlus } from "src/types/homeType";
import { Spaces } from "../../../../../packages/ecommerce-ui/src";
import useFadeIn from "lib/gsap/fadeIn";
import * as DOMPurify from 'dompurify';
import { Placeholder } from "../../../../../packages/ecommerce-ui/src";
interface InfoBijouterieProps {
    infoData: Bloc4SavoirPlus;
}

export const InfoBijouterie: React.FC<InfoBijouterieProps> = ({ infoData }) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [htmlContent2, setHtmlContent2] = useState('');

    /*=============GSAP INITIALISATION===================*/
    // Références pour les éléments que vous souhaitez animer

    useFadeIn({ repeat: false }); // Pour répéter l'animation à chaque fois que l'élément entre dans la vue

    useEffect(() => {
        // Mettre à jour le contenu HTML ici si nécessaire
        setHtmlContent(DOMPurify.sanitize(infoData.descriptionEnSavoirPlus))
        setHtmlContent2(DOMPurify.sanitize(infoData.description2EnSavoirPlus))


    }, [infoData.descriptionEnSavoirPlus]);

    return (
        <div className=" px-2 md:px-60">
            <div className="flex h-full justify-between items-center mx-auto  gap-5 md:gap-10">
                {/* Section */}
                <div className="w-1/2 h-full pl-20  flex flex-col justify-center">
                    <h2 className="text-left titre_secondaire mr-40">
                        {infoData.titresavoirplus}
                    </h2>
                    <p className="text-left texte_class my-8" dangerouslySetInnerHTML={{ __html: htmlContent }}></p>


                </div>
                {/* Section */}
                <div className="w-1/2 flex px-20 items-center justify-end h-full">
                    <Placeholder
                        className="w-full fade-in"
                        src={infoData.photoEnSavoirPlus.node.mediaItemUrl}
                        imageWidth={450}
                        imageHeight={450}
                        alt={infoData.titresavoirplus}
                    />
                </div>
            </div>
            <Spaces />
            <div className="flex h-full justify-between items-center mx-auto  gap-5 md:gap-10">
                {/* Section */}
                <div className="w-1/2 flex items-center justify-center h-full ">
                    <Placeholder
                        className="w-full fade-in"
                        src={infoData.photo2EnSavoirPlus.node.mediaItemUrl}
                        imageWidth={450}
                        imageHeight={450}
                        alt={infoData.sousTitreEnSavoirPlus}
                    />
                </div>
                {/* Section */}
                <div className="w-1/2 h-full px-20 flex flex-col justify-center">

                    <h3 className="text-left titre_secondaire ">
                        {infoData.sousTitreEnSavoirPlus}
                    </h3>
                    <p className="text-left texte_class my-8" dangerouslySetInnerHTML={{ __html: htmlContent2 }}></p>

                </div>



            </div>
        </div>
    );

};