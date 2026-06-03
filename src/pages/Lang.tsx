import { List, ListItem, Radio } from "konsta/react"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer"
import { useIntl } from "react-intl";
import { useConfig } from "../store/config";

const languages = [
    {val:'es', label: '🇪🇸 '},
    {val:'en', label: '🇺🇸 '}
];

export const Lang = () => {
    const {formatMessage:tr} = useIntl();
    const {lang, setLang} = useConfig();

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'lang'})} fallback_url="/" hash_eval="#share" left>
        <List strongIos outlineIos>
            {
                languages.map((l)=>
                    <ListItem
                        key={l.val}
                        label
                        title={l.label+" "+tr({id:'language.'+l.val})}
                        after={
                            <Radio
                            component="div"
                            value={l.val}
                            checked={lang === l.val}
                            onChange={() => setLang(l.val)}
                            />
                        }
                    />
                )
            }
        </List>
    </PageNavbarContainer>
}