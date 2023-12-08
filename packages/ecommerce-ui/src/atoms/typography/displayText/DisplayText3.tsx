import { cva } from "class-variance-authority";
import { FC } from 'react'
const d3Style = cva([" text-2xl md:text-5xl", " leading-10 lg:leading-[60px]"], {
    variants: {
        intent: {
            regular: [
                "font-normal"
            ],
            bold: [
                "font-bold"
            ],
            black: [
                "font-black"
            ],
        },
    },
});

export interface D3props {
    intent?: 'regular' | 'bold' | 'black',
    className?: string
    children?: React.ReactNode
}

export const DisplayText3: FC<D3props> = (props) => {
    const { intent = "regular", className = "", children = "Your Text here" } = props
    return (
        <h3 className={`${d3Style({ intent })} ${className}`}>
            {children}
        </h3>
    )
}