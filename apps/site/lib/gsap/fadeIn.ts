import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface UseFadeInOptions {
    repeat?: boolean; // Option pour répéter l'animation chaque fois que l'élément entre dans la vue
}

const useFadeIn = (options: UseFadeInOptions = {}) => {
    useEffect(() => {
        const fadeElements = document.querySelectorAll(".fade-in");
        fadeElements.forEach((element) => {
            gsap.set(element, { opacity: 0, y: 0 }); // Initialise les éléments avec une opacité de 0

            const toggleActions = options.repeat ? "restart none none reset" : "play none none none";

            gsap.to(element, {
                opacity: 1, // Opacité finale
                y: 0, // Position finale
                duration: 1, // Durée de l'animation
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%", // Le début de l'animation quand le haut de l'élément atteint 80% du viewport
                    end: "bottom 80%", // Fin (pas nécessairement requis ici)
                    toggleActions: toggleActions, // Détermine les actions en fonction de l'option repeat
                },
            });
        });
    }, [options.repeat]); // Dépendance à l'option repeat pour ré-exécuter l'effet si cela change
};

export default useFadeIn;
