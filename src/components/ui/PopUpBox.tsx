import { Button, Navbar, Page, Popup } from "konsta/react";
import { usePopUp } from "../../store/popup";
import { useIntl } from "react-intl";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function PopUpBox(){
    const {title, opened, children, togglePopUp} = usePopUp();
    const {formatMessage:tr} = useIntl();
    const [params] = useSearchParams();
    const opn = params.get("emergent") === "popupbox";
    const navigate = useNavigate();
    useEffect(()=>{
        togglePopUp(opn);
    },[opn])

    return <Popup opened={opened} onBackdropClick={() => navigate(-1)}>
        <Page>
          <Navbar
            className="k-title"
            title={title}
            right={
              <Button title='Cerrar' className='mr-3 ios:m-0 k-btn' small rounded onClick={() => {
                navigate(-1);
              }}>
                {tr({id:'close'})}
              </Button>
            }
          />
          {children}
        </Page>
      </Popup>
}