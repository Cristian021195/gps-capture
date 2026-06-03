import { Notification } from "konsta/react";
import { useNotification } from "../../store/notification";

export function Notificacion(){
    const {title, subtitle, rightText, bottomText, opened, icon, children, closeNotification} = useNotification();
    return <Notification
        className="k-panel-form shadow-md dark:shadow-gray-900"
        opened={opened}
        icon={icon}
        title={title}
        titleRightText={rightText}
        subtitle={subtitle}
        text={bottomText}
        onClick={() => closeNotification()}
    >
        {children}
    </Notification>
}