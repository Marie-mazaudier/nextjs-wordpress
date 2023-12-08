import { cva } from "class-variance-authority";
import {RxStarFilled} from "react-icons/rx";

const AvatarStyle = cva(["rounded-full"], {
  variants: {
    size: {
      sm: ["w-2.5", "h-2.5"],
      md: ["w-4", "h-4"],
      lg: ["w-5", "h-5"],
    },
    color: {
      yellow: ["text-themeWarning500"],
      gray: ["text-themeSecondary300"],
    },
    defaultVariants: {
      size: "lg",
      color: "yellow",
    },
  },
});


export interface RatingsProps {
  size?: "sm" | "md" | "lg";
  color?: "yellow" | "gray";
}


export const Ratings = ({ size='lg',color='yellow' }: RatingsProps) => {
  return (
    <>
      <RxStarFilled className={`${AvatarStyle({ size, color })} cursor-pointer`} />
    </>
  );
};
