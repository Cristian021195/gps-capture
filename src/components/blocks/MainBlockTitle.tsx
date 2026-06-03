import { Block, BlockTitle } from "konsta/react";

interface IProps {
    title:string,
    children: React.ReactNode,
    className?:string
};

export const MainBlockTitle = ({title, children, className}:IProps) => {
    return <>
        <BlockTitle className="capitalize">{title}:</BlockTitle>
        <Block strong inset className={className}>
            {children}
        </Block>
    </>
}

export const MainDivTitle = ({title, children, className}:IProps) => {
    return <>
        <BlockTitle className="capitalize">{title}:</BlockTitle>
        <div className={className}>
            {children}
        </div>
    </>
}