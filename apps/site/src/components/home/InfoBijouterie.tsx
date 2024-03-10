import React, { useEffect, useRef, useState } from "react";
import { Bloc4SavoirPlus } from "src/types/homeType";
import useFadeIn from "lib/gsap/fadeIn";
import * as DOMPurify from 'dompurify';

interface InfoBijouterieProps {
    infoData: Bloc4SavoirPlus;
}

export const InfoBijouterie: React.FC<InfoBijouterieProps> = ({ infoData }) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [htmlContent2, setHtmlContent2] = useState('');

    /*=============GSAP INITIALISATION===================*/
    // Références pour les éléments que vous souhaitez animer

    useFadeIn({ repeat: true }); // Pour répéter l'animation à chaque fois que l'élément entre dans la vue


    // Nous utilisons un style inline pour l'URL de l'image de fond pour une meilleure lisibilité.
    const styleBackground1 = {
        backgroundImage: `url(${infoData.photoEnSavoirPlus.node.mediaItemUrl})`,
        backgroundSize: 'cover', // pour s'assurer que l'image de fond couvre tout le conteneur
        backgroundPosition: 'center', // pour centrer l'image de fond

    };
    useEffect(() => {
        // Mettre à jour le contenu HTML ici si nécessaire
        setHtmlContent(DOMPurify.sanitize(infoData.descriptionEnSavoirPlus))
        setHtmlContent2(DOMPurify.sanitize(infoData.description2EnSavoirPlus))


    }, [infoData.descriptionEnSavoirPlus]);

    return (
        <div className=" px-2 md:px-20">
            <div className="flex h-full justify-between items-center mx-auto  gap-5 md:gap-10">
                {/* Section */}
                <div className="w-2/3 h-full px-20 flex flex-col justify-center">
                    <h2 className="text-left titre_secondaire">
                        {infoData.titresavoirplus}
                    </h2>
                    <p className="text-left texte_class my-8" dangerouslySetInnerHTML={{ __html: htmlContent }}></p>
                    <h3 className="text-left text-3xl">
                        {infoData.sousTitreEnSavoirPlus}
                    </h3>
                    <p className="text-left texte_class my-8" dangerouslySetInnerHTML={{ __html: htmlContent2 }}></p>

                </div>
                {/* Section */}
                <div className="w-1/3 flex px-20 items-center justify-end	  h-full bg-no-repeat bg-slate-50 bg-center bg-cover" style={styleBackground1}>

                </div>


            </div>
        </div>
    );

};