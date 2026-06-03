import { Block } from "konsta/react";
import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { useConfig } from '../../store/config';
import { md_empresa_info_dark, md_empresa_info_light } from "../../utils/markdown-components";

interface IProps {
    description?:string
}

export const PopupHorarioDescripcion = ({description='# Default'}:IProps) => {
    const {night_mode} = useConfig();
    return <Block>
        <Markdown remarkPlugins={[remarkGfm]} components={night_mode ? md_empresa_info_dark : md_empresa_info_light} urlTransform={(url) => (url.startsWith('tel:') ? url : defaultUrlTransform(url))}>
            {description}
        </Markdown>
    </Block>
}