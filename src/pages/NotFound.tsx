import { Block, BlockTitle, Button } from "konsta/react"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer"
import { useIntl } from "react-intl"
import { useConfig } from "../store/config";
import not_found from "../assets/not-found.svg";
import { Link } from "react-router-dom";

export const NotFound = () => {
    const {formatMessage:tr} = useIntl();
    const {night_mode} = useConfig();
    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'notfound'})} fallback_url="/" hash_eval="#share">
        <Block className={`space-y-4 ${night_mode ? '' : 'text-black'}`}>
            <div className="*:text-base">
            <div className="flex justify-center p-3 mb-3">
                <img src={not_found} width={120} height={120} className="hithere-2" alt="Not Found 404 Image" />
            </div>
            <BlockTitle>{tr({id:'notfound.title'})}</BlockTitle>
            <Block>
                <p>
                {tr({id:'notfound.description1'})}
                </p>
            </Block>
            <Block>
                <p>
                {tr({id:'notfound.description2'})}
                </p>
            </Block>
            <Link to={'/'} replace={true}>
                <Button className="tonal w-1/2 mx-auto uppercase" small tonal>{tr({id:'go.home'})}</Button>
            </Link>
            </div>
        </Block>
    </PageNavbarContainer>
}