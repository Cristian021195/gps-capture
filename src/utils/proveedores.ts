import gmap from '../assets/gmaps.svg';
import osm from '../assets/osm.svg';
import locationIQ from '../assets/LocationIQ.png';
import heremaps from '../assets/heremaps.svg';
import mapbox from '../assets/mapbox.svg';

export const proveedores_default = [
    {
        id: 'google',
        nombre: 'Google Maps',
        descripcion: 'map.provider.desc',
        alt: 'googleapis',
        service: 'google',
        img: gmap,
        bg: 'bg-transparent',
    },
    {
        id: 'heremaps',
        nombre: 'Here Maps',
        descripcion: 'map.provider.desc',
        alt: 'heremaps',
        service: 'heremaps',
        img: heremaps,
        bg: 'bg-transparent'
    },
    {
        id: 'osm',
        nombre: 'Open Stret Maps',
        descripcion: 'map.provider.desc',
        alt: 'openstreetmap',
        service: 'nominatim',
        img: osm,
        bg: 'bg-transparent'
    },
    {
        id: 'locationiq',
        nombre: 'LocationIQ',
        descripcion: 'map.provider.desc',
        alt: 'locationiq',
        service: 'locationiq',
        img: locationIQ,
        bg: 'bg-red-400'
    },
    {
        id: 'mapbox',
        nombre: 'MapBox',
        descripcion: 'map.provider.desc',
        alt: 'mapbox',
        service: 'mapbox',
        img: mapbox,
        bg: 'bg-transparent'
    }
];