// src/maps/icons.ts

import L from "leaflet";

export const normalMarker = L.divIcon({
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="#2563eb" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
        </svg>
    `,//2563eb
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
});

export const selectedMarker = L.divIcon({
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="#dc2626" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
        </svg>
    `,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});