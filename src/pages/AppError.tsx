import { useIntl } from "react-intl";
import { useConfig } from "../store/config";
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer";
import { Block, BlockTitle, Button } from "konsta/react";
import { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";
import error_app from "../assets/error-app.svg";

export const AppError = () => {
    const {formatMessage:tr} = useIntl();
    const {night_mode} = useConfig();
    const error = useRouteError() as Error;

    useEffect(()=>{
        //localStorage.removeItem('widgets');
        //localStorage.removeItem('favoritos');
    },[])

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'broken'})} fallback_url="/" hash_eval="#share">
        <Block className={`space-y-4 select-text ${night_mode ? '' : 'text-black'}`}>
            <div className="*:text-base">
                <div className="flex justify-center p-3 mb-3">
                    <img src={error_app} width={160} className="hithere-2" alt="Not Found 404 Image" />
                </div>
                <BlockTitle>{tr({id:'broken.t'})}</BlockTitle>
                <Block>
                    <p>
                    {tr({id:'broken.d1'})}
                    </p>
                </Block>
                <Block>
                    <p>
                    {tr({id:'broken.d2'})}
                    </p>
                </Block>
                <Block>
                    <p>
                    {tr({id:'broken.d3'})}
                    </p>
                </Block>
                <Block>
                    <div className="text-red-500">
                        <code>{error.message}: {error.name}</code>
                    </div>
                </Block>
                <Link to={'/'} replace={true}>
                    <Button className="k-btn-tonal w-1/2 mx-auto uppercase" small>{tr({id:'go.home'})}</Button>
                </Link>
            </div>            
        </Block>
    </PageNavbarContainer>
}