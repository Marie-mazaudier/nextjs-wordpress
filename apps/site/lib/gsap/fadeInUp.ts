import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const useFadeInUp = () => {
    useEffect(() => {
        const fadeElements = document.querySelectorAll(".fade-in");
        fadeElements.forEach((element) => {
            gsap.set(element, { opacity: 0, y: 100 }); // Initialise les éléments avec une opacité de 0 et un déplacement vers le bas

            gsap.to(element, {
                opacity: 1, // Opacité finale
                y: 0, // Position finale (revient à sa position d'origine)
                duration: 1, // Durée de l'animation
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%", // Le début de l'animation quand le haut de l'élément atteint 80% du viewport
                    end: "bottom 80%", // Fin (pas nécessairement requis ici)
                    toggleActions: "play none none none", // Joue l'animation une fois sans inversion
                },
            });
        });
    }, []); // Exécuté une seule fois à l'initialisation du composant
};

export default useFadeInUp;
