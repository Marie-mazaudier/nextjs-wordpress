import React, { useEffect, useRef } from "react";
import { Placeholder } from "@jstemplate/ecommerce-ui";
import { BodyText } from "@jstemplate/ecommerce-ui";
import { Heading1 } from "@jstemplate/ecommerce-ui";
import { Bloc2 } from "src/types/homeType";
import { Button } from "@jstemplate/ecommerce-ui";
import useFadeIn from "lib/gsap/fadeIn";
import useFadeInUp from "lib/gsap/fadeInUp";
import useVerticalScroll from "lib/gsap/verticalScroll";
interface twoCategoriesProps {
    infoData: Bloc2;
}

export const TwoCategories: React.FC<twoCategoriesProps> = ({ infoData }) => {
    /*=============GSAP INITIALISATION===================*/
    // Références pour les éléments que vous souhaitez animer

    useFadeIn({ repeat: true }); // Pour répéter l'animation à chaque fois que l'élément entre dans la vue




    // Nous utilisons un style inline pour l'URL de l'image de fond pour une meilleure lisibilité.
    const styleBackground1 = {
        backgroundImage: `url(${infoData.montresDames.node.mediaItemUrl})`,
        backgroundSize: 'cover', // pour s'assurer que l'image de fond couvre tout le conteneur
        backgroundPosition: 'center', // pour centrer l'image de fond

    };
    const styleBackground2 = {
        backgroundImage: `url(${infoData.montresHomme.node.mediaItemUrl})`,
        backgroundSize: 'cover', // pour s'assurer que l'image de fond couvre tout le conteneur
        backgroundPosition: 'center', // pour centrer l'image de fond
    };

    return (
        <div className=" h-72 px-2 md:px-20">
            <div className="flex h-full justify-between items-center mx-auto  gap-5 md:gap-10">
                {/* Section pour les montres pour dames */}
                <div className="w-1/2 flex px-20 items-center justify-end	  h-full bg-no-repeat bg-slate-50 bg-center bg-cover" style={styleBackground1}>
                    <h2 className="text-center titre_secondaire"><span className="text-lg text-secondaire">MONTRES</span> <br></br>DAME</h2>
                </div>

                {/* Section pour les montres pour hommes */}
                <div className="w-1/2 h-full px-20 flex  items-center justify-end	 bg-no-repeat bg-slate-50 bg-center bg-cover" style={styleBackground2}>
                    <h2 className="text-center titre_secondaire"><span className="text-lg text-secondaire">MONTRES</span><br></br>  HOMME</h2>
                </div>
            </div>
        </div>
    );

};