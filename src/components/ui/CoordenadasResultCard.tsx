import { Card } from "konsta/react"

export const CoordenadasResultCard = () => {
  return (
    <Card outline>
        <div className="grid grid-cols-2">
            <div className="col-span-1">
                <p><b>Latitud: </b>-65.651651</p>
                <p><b>Longitud: </b>25.651651</p>
            </div>
            <div className="col-span-1">
                <p><b>Creación: </b>2026-06-05</p>
                <p><b>Id: </b>25651651</p>
            </div>
            <div className="col-span-2 mt-2">
                <p><b>Descripción</b>: asldalsd asldalsd asldalsd</p>
            </div>
            <div className="col-span-2">
                <p><b>Calle</b>: asldalsd asldalsd asldalsd</p>
            </div>
        </div>
    </Card>
  )
}
