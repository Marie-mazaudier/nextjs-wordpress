export interface SliderData {
    title: string;
    text: string;
    src: string;
    floatingImage: string;
}

export interface SliderNode {
    node: {
        mediaItemUrl: string;
    };
}

export interface SliderChamps {
    imageFlotante: SliderNode;
    lienBouton: string;
    photoSlider: SliderNode;
}

export interface SliderType {
    id: string;
    title: string;
    content: string;
    sliderChamps: SliderChamps;
}

export interface QueryData {
    sliders: {
        nodes: SliderType[];
    };
}

export interface SyncSliderProps {
    className?: string;
}
