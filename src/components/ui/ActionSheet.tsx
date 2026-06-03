import { Actions, ActionsButton, ActionsGroup, ActionsLabel } from "konsta/react";
import { useActionSheet } from "../../store/action_sheet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function ActionSheet(){
    const {title, opened, closeText, toggleActionSheet} = useActionSheet();
    const [params] = useSearchParams();
    const opn = params.get("emergent") === "actionsheet";
    const navigate = useNavigate();
    useEffect(()=>{
        toggleActionSheet(opn);
    },[opn])

    return <Actions opened={opened}onBackdropClick={() => navigate(-1)}>
        <ActionsGroup>
            <ActionsLabel>{title}</ActionsLabel>
            <ActionsButton onClick={() => {console.log('a')}} bold>
            Button 1
            </ActionsButton>
            <ActionsButton onClick={() => {console.log('b')}}>
            Button 2
            </ActionsButton>
            <ActionsButton onClick={() => {console.log('c')}}>
            {closeText}
            </ActionsButton>
        </ActionsGroup>
    </Actions>
}