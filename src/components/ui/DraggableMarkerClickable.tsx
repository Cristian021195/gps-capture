import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Marker, Popup } from "react-leaflet"
import type { Marker as LeafletMarker } from 'leaflet';
import { useIntl } from 'react-intl';
import { normalMarker } from "../svg/Leaflet";

interface IProps extends IPos {// seguramente neceitamos callbacks    
    setPosicion: ({lat, lng}:IPos) => void
    onSelect?: () => void
}

interface IPos {
    lat: number,
    lng: number
}

export const DraggableMarkerClickable = ({lat=-26.845085, lng=-65.221010, setPosicion, onSelect}:IProps) => {
  const [draggable, setDraggable] = useState(false)
  const {formatMessage:tr} = useIntl();
  const [markerPosition, setMarkerPosition] = useState({lat, lng})
  const markerRef = useRef<LeafletMarker>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setMarkerPosition(marker.getLatLng() as IPos);
          setPosicion(marker.getLatLng() as IPos)
        }
      },
      click: () => {
        onSelect?.();
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMarkerPosition({ lat, lng });
}, [lat, lng]);

  return (
    <Marker      
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={markerPosition}
      ref={markerRef}
      icon={normalMarker}
      >      
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? tr({id:'gps.move.on'})
            : tr({id:'gps.move'})
            }
        </span>
      </Popup>
    </Marker>
  )
}
