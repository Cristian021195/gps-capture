import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer"

export const Pruebas = () => {
    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title="Pruebas" fallback_url="/" hash_eval="#share" left>
        <div className="w-full overflow-scroll">
        <MapContainer center={{lat: -26.84508745, lng:-65.22099903}} zoom={13} scrollWheelZoom={false} style={{height:'420px'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"                
            />
            <Marker position={[-26.84508745, -65.22099903]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
        </div>
    </PageNavbarContainer>
}