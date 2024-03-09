import React, { useEffect, useState } from 'react';
import { getCookie, setCookie } from "cookies-next";
import { usePopups } from 'lib/graphQL/usePopups'; // Assurez-vous que le chemin d'importation est correct
import { PopupNode } from '../../types/popupsTypes'; // Ajustez selon votre chemin d'importation

const Popup: React.FC = () => {
    const { data, loading, error } = usePopups();
    const [showPopup, setShowPopup] = useState(false);
    const [popupClass, setPopupClass] = useState("opacity-0");

    useEffect(() => {
        // Trouvez la première popup active dont la période est valide
        const now = new Date();
        const activePopup = data?.popupsAcf.nodes.find((node: PopupNode) => {
            const { popupActive, dateDebut, dateDeFin } = node.popupChamps;
            const startDate = new Date(dateDebut);
            const endDate = new Date(dateDeFin);
            return popupActive && now >= startDate && now <= endDate;
        });

        if (activePopup) {
            const { cookiesAfficheLaPopupUneFoisParJour } = activePopup.popupChamps;

            // Si les cookies ne sont pas utilisés pour contrôler l'affichage, ou s'ils sont utilisés mais aucun cookie n'a été trouvé
            if (!cookiesAfficheLaPopupUneFoisParJour || !getCookie('hasSeenPopup')) {
                setShowPopup(true);

                // Définissez l'opacité à 100 après un court délai pour permettre la transition CSS
                setTimeout(() => {
                    setPopupClass("opacity-100");
                }, 10);

                if (cookiesAfficheLaPopupUneFoisParJour) {
                    // Mettez à jour le cookie pour expirer le lendemain
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setCookie('hasSeenPopup', 'true', { expires: tomorrow });
                }
            }
        }
    }, [data]);
    console.log(showPopup)
    const handleClose = () => {
        setPopupClass("opacity-0");
        setTimeout(() => setShowPopup(false), 500); // Attendez la fin de la transition pour cacher
    };

    // La classe 'fixed' est maintenant conditionnelle à la valeur de 'showPopup' et 'popupClass'
    const containerClasses = showPopup && popupClass === 'opacity-100'
        ? `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 z-[999999999]`
        : `opacity-0`;

    if (!showPopup || loading || error) return null;

    const popupToShow = data?.popupsAcf.nodes.find((node: PopupNode) => node.popupChamps.popupActive && new Date() >= new Date(node.popupChamps.dateDebut) && new Date() <= new Date(node.popupChamps.dateDeFin));

    return (
        <div className={containerClasses}>
            {popupToShow && (
                <div key={popupToShow.id} className="relative popup bg-white p-4 shadow-lg" style={{ width: '600px', maxWidth: '100%' }}>
                    <button onClick={handleClose} className="absolute top-0 right-0 m-2 bg-black p-1">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <img src={popupToShow.popupChamps.imagePopup.node.mediaItemUrl} alt="" className="w-full h-auto" />
                </div>
            )}
        </div>
    );
};

export default Popup;
