import { Navbar, NavbarBackLink, Page } from "konsta/react";
import { useLocation, useNavigate } from "react-router-dom";
import type { IPageNavbarContainer } from "../../interfaces/INavbar";


export function PageNavbarContainer({title, children, left, right, hash_eval, fallback_url, nested, subtitle, subnavbar, className, bgClassName}:IPageNavbarContainer){
    const navigate = useNavigate();
    const { hash } = useLocation();
    if(left && !right){
        return <Page>
            <Navbar
                title={title}
                subtitle={subtitle}
                subnavbar={subnavbar}
                bgClassName={bgClassName}
                className={className+" capitalize"}
                left={<NavbarBackLink text="Atrás" onClick={()=>{
                    if(hash === hash_eval){
                        navigate(fallback_url+"")
                    }else{
                        if (window.history.state?.idx > 0) {
                            navigate(-1);
                        } else {
                            navigate("/", { replace: true });
                        }
                    }
                }} />}
            />
            <main className={ nested ? "fade-down" : "fade-up-section"}>
            {children}
            </main>
        </Page>

    }

    if(!left && right){
        return <Page>
            <Navbar
                title={title}
                subtitle={subtitle}
                subnavbar={subnavbar}
                bgClassName={bgClassName}
                className={className+" capitalize"}
                right={right}
            />
            <main className={ nested ? "fade-down" : "fade-up-section"}>
            {children}
            </main>
        </Page>
    }

    if(left && right){
        return <Page>
            <Navbar
                title={title}
                subtitle={subtitle}                
                subnavbar={subnavbar}
                bgClassName={bgClassName}
                className={className+" capitalize"}
                left={<NavbarBackLink text="Atrás" onClick={()=>{
                    if(hash === hash_eval){
                        navigate(fallback_url+"")
                    }else{
                        if (window.history.state?.idx > 0) {
                            navigate(-1);
                        } else {
                            navigate("/", { replace: true });
                        }
                    }
                }} />}
                right={right}
            />
            <main className={ nested ? "fade-down" : "fade-up-section"}>
            {children}
            </main>
        </Page>
    }

    if(!left && !right){
        return <Page>
            <Navbar
                title={title}
                subtitle={subtitle}
                subnavbar={subnavbar}
                bgClassName={bgClassName}
                className={className+" capitalize"}
            />
            <main className={ nested ? "fade-down" : "fade-up-section"}>
            {children}
            </main>
        </Page>
    }
}