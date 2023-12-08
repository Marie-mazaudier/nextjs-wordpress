import React from "react";

interface FormLoaderProps {
  color?: string;
  size?: string;
}

export const FormLoader = ({ color, size }: FormLoaderProps) => {
  return (
    <svg
      className={`ml-2 animate-spin ${size ? size : "h-5 w-5"} ${color ? color : "text-white"}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};


export const Loader = ({ bg }: { bg?: string }) => {
  return (
    <div id="preloader" className={bg ? bg : `bg-white`}>
      <div className={`sk-three-bounce ${bg ? bg : `bg-white`}`}>
        <div className="sk-child sk-bounce1"></div>
        <div className="sk-child sk-bounce2"></div>
        <div className="sk-child sk-bounce3"></div>
      </div>
    </div>
  );
};


export const LoaderGrowing = () => {
  return (
    <div className="absolute inset-0 flex bg-[#ffffffd0] z-40 justify-center items-center">
      <div className="animate-spin text-themeBlueLighter h-10 w-10" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
