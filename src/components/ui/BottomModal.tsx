import { Block, Button, Sheet, Toolbar, ToolbarPane } from "konsta/react";
import { useBottomModal } from "../../store/bottom_modal";
import { useIntl } from "react-intl";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function BottomModal(){
    const {title,opened, children, toggleBottomModal} = useBottomModal();
    const {formatMessage:tr} = useIntl();
    const [params] = useSearchParams();
    const opn = params.get("emergent") === "bottommodal";
    const navigate = useNavigate();
    useEffect(()=>{
        toggleBottomModal(opn);
    },[opn])


    return <Sheet
        className="pb-safe"
        opened={opened}
        onBackdropClick={()=>{
          navigate(-1);
        }}
      >
        <Toolbar top className="justify-end ios:pt-4 ios:hidden">
          <div>
            <b>{title}</b>
          </div>
          <ToolbarPane>
            <Button title={tr({id:'close'})} className="w-fit k-btn" small rounded onClick={()=>{
              navigate(-1);
            }}>
                {tr({id:'close'})}
            </Button>
          </ToolbarPane>
        </Toolbar>
        <Block className="ios:mt-4">
            {children}
        </Block>
    </Sheet>
}