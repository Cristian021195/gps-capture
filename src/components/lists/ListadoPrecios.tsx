import { useIntl } from "react-intl"

export function ListadoPrecios() {
    const { formatMessage: tr } = useIntl()

    return <p className="text-center">{tr({ id: 'noresults' })}</p>
}
