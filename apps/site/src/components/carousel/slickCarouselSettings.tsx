import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../../styles/slider-arrows.module.scss";

interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const PrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
    <div className={`${className} ${styles.prevArrow}`} onClick={onClick}>
        <img src="/svg/angle-left-svgrepo-com.svg" alt="Previous" />
    </div>
);

const NextArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
    <div className={`${className} ${styles.nextArrow}`} onClick={onClick}>
        <img src="/svg/angle-right-svgrepo-com.svg" alt="Next" />
    </div>
);

export const getSlickSettings = (itemsToShow: number) => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: itemsToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: itemsToShow > 2 ? 2 : itemsToShow,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
});
