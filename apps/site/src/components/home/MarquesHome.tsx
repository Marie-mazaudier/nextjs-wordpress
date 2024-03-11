import React, { useEffect, useRef, useState } from "react";
import { Bloc5MarquesDeBijoux } from "src/types/homeType";
import { Button } from "@jstemplate/ecommerce-ui";
import { Spaces } from "@jstemplate/ecommerce-ui";
import useFadeIn from "lib/gsap/fadeIn";
import { Placeholder } from "@jstemplate/ecommerce-ui";
import { BodyText } from "@jstemplate/ecommerce-ui";


interface MarquesProps {
    infoData: Bloc5MarquesDeBijoux;
}

export const MarquesHome: React.FC<MarquesProps> = ({ infoData }) => {
    // Transformer l'objet infoData en un tableau de marques

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="titre_secondaire text-center mb-20">Parcourir les bijoux par marque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                <div className="bg-white text-center shadow-md  p-10 flex flex-col justify-between">
                    <h2 className="text-xl font-semibold mb-2">{infoData.marque1.titreMarque1}</h2>
                    <BodyText size="md">{infoData.marque1.descriptionMarque1}</BodyText>
                    <div className="flex justify-center">
                        <Button size="sm" className="mt-4">{infoData.marque1.boutonMarque1}</Button>
                    </div>
                </div>
                <div className="bg-white text-center shadow-md  p-10 flex flex-col justify-between">
                    <h2 className="text-xl font-semibold mb-2">{infoData.marque2.titreMarque2}</h2>
                    <BodyText size="md">{infoData.marque2.descriptionMarque2}</BodyText>
                    <div className="flex justify-center">
                        <Button size="sm" className="mt-4">{infoData.marque2.boutonMarque2}</Button>
                    </div>
                </div>
                <div className="bg-white text-center shadow-md  p-10 flex flex-col justify-between">
                    <h2 className="text-xl font-semibold mb-2">{infoData.marque3.titreMarque3}</h2>
                    <BodyText size="md">{infoData.marque3.descriptionMarque3}</BodyText>
                    <div className="flex justify-center">
                        <Button size="sm" className="mt-4">{infoData.marque3.boutonMarque3}</Button>
                    </div>
                </div>
                <div className="bg-white text-center shadow-md  p-10 flex flex-col justify-between">
                    <h2 className="text-xl font-semibold mb-2">{infoData.marque4.titreMarque4}</h2>
                    <BodyText size="md">{infoData.marque4.descriptionMarque4}</BodyText>
                    <div className="flex justify-center">
                        <Button size="sm" className="mt-4">{infoData.marque4.boutonMarque4}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};