// useVerticalScroll.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { RefObject, useCallback } from "react";

gsap.registerPlugin(ScrollTrigger);

interface VerticalScrollOptions {
    fromY: number;
    toY: number;
    duration: number;
    start: string;
    end: string;
    scrub: number;
}

const useVerticalScroll = (
    ref: RefObject<HTMLElement>,
    options: VerticalScrollOptions
) => {
    const animate = useCallback(() => {
        const element = ref.current;

        if (element) {
            gsap.fromTo(
                element,
                { y: options.fromY },
                {
                    y: options.toY,
                    duration: options.duration,
                    scrollTrigger: {
                        trigger: element,
                        start: options.start,
                        end: options.end,
                        scrub: options.scrub,
                    },
                }
            );
        }

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [ref, options]);

    return animate;
};

export default useVerticalScroll;
