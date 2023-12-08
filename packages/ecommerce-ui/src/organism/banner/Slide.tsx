import React, { FC } from "react";
import { Button } from "../../atoms/button/Button";

export interface SlideProps {
    src: string;
    imageHeight: number;
    imageWidth: number;
}

export const Slide: FC<SlideProps> = ({ src, imageHeight }) => {
    const slideStyle = {
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    return (
        <section className="relative h-screen bg-opacity-75" style={slideStyle}>
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="mx-auto md:w-9/12 lg:w-9/12 xl:w-9/12 grid grid-cols-1 md:grid-cols-2">
                    <div className=" flex flex-col  h-[60vh] justify-end ">
                        <div className="text-left text-white z-40">
                            <h2 className="text-4xl  mb-4 blanc">SAVOIR-FAIRE <br /> & EXCELLENCE</h2>
                        </div>
                    </div>
                    <div className=" flex flex-col  items-end justify-end">
                        <div className="text-right text-white z-40">
                            <div className="text-right text-white z-40">
                                <h2 className="text-4xl  mb-4 blanc">AOC <br /> CÔTES DE PROVENCE</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-25 w-full h-full "></div>
            <div className="absolute justify-center flex flex-col z-40 bottom-0 left-0 h-[120px] w-[120px] bg-secondaire">
                <a href="#presentation">
                    <svg className="m-auto" fill="#fff" width="60px" height="60px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                        <path d="M902.83 0v1699.925l-476.465-476.467L345 1304.823 960.177 1920l615.407-615.177-81.365-81.365-476.466 476.467V0z" fill-rule="evenodd" />
                    </svg>
                </a>

            </div>
        </section>
    );
};
