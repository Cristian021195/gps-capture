import gmap from '../assets/gmaps.svg';
import osm from '../assets/osm.svg';

export const proveedores_default = [
    { 
        id: 'google', 
        nombre: 'Google Maps',
        descripcion: 'map.provider.desc', 
        alt: 'googleapis', 
        service: 'google',
        img: gmap
    },
    { 
        id: 'osm', 
        nombre: 'Open Stret Maps',
        descripcion: 'map.provider.desc', 
        alt: 'openstreetmap', 
        service: 'nominatim',
        img: osm
    },
];
// 'google' | 'osm' | 'mapbox' | 'bing'