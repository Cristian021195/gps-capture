import { Link } from "react-router-dom"
import { useIntl } from "react-intl"
import type { IFavoritos } from "../../interfaces/IFavoritos"

interface IProps {
    favoritos: IFavoritos[]
}

export function ListadoEmpresasFavoritas({ favoritos }: IProps) {
    const {formatMessage:tr} = useIntl();

    return favoritos.map((e) => {

        return (
            <div key={e.empresa_id} className="flex justify-between capitalize my-2">
                <div>
                    <Link className="kclink kclink-u" to={`/empresa/${e.empresa}/info?c=3&p=3&id=${e.empresa_id}`}>
                        {e.empresa}
                    </Link>
                </div>
                <div className="flex justify-between gap-4">
                    <Link className="kclink kclink-u" to={`/empresa/${e.empresa}/horario?c=1&p=1&id=${e.empresa_id}`}>
                        {tr({id:'horarios'})}
                    </Link>
                    <Link className="kclink kclink-u" to={`/empresa/${e.empresa}/precio?c=2&p=2&id=${e.empresa_id}`}>
                        {tr({id:'precios'})}
                    </Link>
                </div>
            </div>
        )
    })
}

/*
<div key={e.empresa_id} className="flex justify-between [&>button]:capitalize">
<Button title={e.empresa} clear className="text-left justify-start">
    <Link to={`/empresa/${e.empresa}/info?c=3&p=3&id=${e.empresa_id}`}>
        {e.empresa}
    </Link>
</Button>
<Button title={e.empresa} clear className="">
    <Link to={`/empresa/${e.empresa}/horario?c=1&p=1&id=${e.empresa_id}`}>
        {tr({id:'horarios'})}
    </Link>
</Button>
<Button title={e.empresa} clear className="">
    <Link to={`/empresa/${e.empresa}/precio?c=2&p=2&id=${e.empresa_id}`}>
        {tr({id:'precios'})}
    </Link>
</Button>
<NuevoLink>Link</NuevoLink>
</div>
*/