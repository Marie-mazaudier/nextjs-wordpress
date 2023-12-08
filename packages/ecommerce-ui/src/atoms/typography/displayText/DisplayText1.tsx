import { cva } from "class-variance-authority";
import { FC } from 'react'
const d3Style = cva(["text-2xl md:text-5xl lg:text-7xl", " leading-10 lg:leading-[88px]"], {
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

export interface D1props {
    intent?: 'regular' | 'bold' | 'black',
    className?: string
    children?: React.ReactNode
}

export const DisplayText1: FC<D1props> = (props) => {
    const { intent = "regular", className = "", children = "Your Text here" } = props
    return (
        <h3 className={`${d3Style({ intent })} ${className}`}>
            {children}
        </h3>
    )
}