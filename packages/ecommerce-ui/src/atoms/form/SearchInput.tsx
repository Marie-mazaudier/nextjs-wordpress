import { cva } from "class-variance-authority";
import { FC } from 'react'
const InputStyle = cva(["font-normal",], {
    variants: {
        size: {
            xs: [
                "text-xs",
                "leading-5",
                "px-4",
                "py-2"
            ],
            sm: [
                "text-sm",
                "leading-5",
                "px-4",
                "py-2.5"
            ],
            md: [
                "text-base",
                "leading-6",
                "px-5",
                "py-3"
            ],
            lg: [
                "text-sm",
                "leading-6",
                "px-5",
                "py-3"
            ],
            xl: [
                "text-base",
                "leading-7",
                "px-6",
                "py-3"
            ],
        },
        type: {
            focus: [
                // "focus:border-themePrimary600",
                "outline-none",
                "bg-themeSecondary800",
                "focus:text-white",
                "placeholder:text-themeSecondary500",
                "rounded-l-full"
            ],
            noFocus: [
                "outline-none",
                "border border-themeSecondary200",
                "bg-white"
            ],
        },
    },
});

export interface SearchInputProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    type?: 'focus' | 'noFocus',
    className?: string,
    placeholder?: string,
}

export const SearchInput: FC<SearchInputProps> = (props) => {
  const { size = "md", className = "", type = "noFocus", placeholder = "Email" } = props;
  return <input type="text" placeholder={placeholder} className={`${InputStyle({ size, type })} ${className}`} />;
};