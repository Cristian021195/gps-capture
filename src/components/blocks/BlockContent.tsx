import { BlockTitle } from "konsta/react";

interface IProps {
    title:string,
    children: React.ReactNode
};

export const BlockContent = ({title, children}:IProps) => {
    return <>
        <BlockTitle className="capitalize mb-2 k-title">{title}:</BlockTitle>
        {children}
    </>
}