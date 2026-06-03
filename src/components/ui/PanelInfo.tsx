import { Navbar, Page, Panel, Link, Block } from "konsta/react"
import { CloseIcon } from "../svg/UtilsIcon"
import { usePanel } from "../../store/panel"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { APP_VERSION } from "../../utils/version";
import { useIntl } from "react-intl";

export const PanelInfo = () => {
    const {opened, side, children, floating, title,  togglePanel} = usePanel();
    const [params] = useSearchParams();
    const opn = params.get("emergent") === "panel";
    const navigate = useNavigate();
    const {formatMessage:tr} = useIntl();
    useEffect(()=>{
        togglePanel(opn);
    },[opn])    

    return <Panel
                side={side}
                opened={opened}
                floating={floating}
                onBackdropClick={()=>{navigate(-1)}}
            >
            <Page>
            <Navbar
                title={title}
                right={
                <Link iconOnly onClick={()=>{navigate(-1)}}>
                    <CloseIcon />
                </Link>
                }
            />
            <Block className="space-y-4">
                {children}
            </Block>
                <p className="absolute bottom-2 right-4">{tr({id:'version'})} {APP_VERSION.release.major}.{APP_VERSION.release.minor}.{APP_VERSION.release.patch}</p>
            </Page>
    </Panel>
}