import { Button, Toast } from "konsta/react";
import { useToast } from "../../store/toast";
import { useIntl } from "react-intl";

export function ToastAlert(){
    const {text, opened, position, className, closeToast} = useToast();
    const {formatMessage:tr} = useIntl();
    return <Toast
        className={className}
        position={position}
        opened={opened}
        button={
            <Button rounded clear small inline onClick={() => closeToast()}>
                {tr({id:'close'})}
            </Button>
        }>
        <div className="shrink">{text}</div>
    </Toast>
}