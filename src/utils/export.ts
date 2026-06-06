/* eslint-disable no-useless-assignment */
import type { IExportRegistroGPS } from "../interfaces/IExportEntidades";

export const exportCSVRegistroGPS = (data: IExportRegistroGPS[], os:'linux'|'ms', nombre:string = "filename") => {
    const headers = ['id', 'latitud', 'longitud', 'titulo'];
    let csvContent = null;
    let blob = null;

    let rows = [];    

    if(os === 'linux'){
        rows = data.map(item => [
            item.id,
            item.latitud,
            item.longitud,
            `"${item.titulo.replace(/"/g, '""')}"`
        ]);

        csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        blob = new Blob([csvContent], {
            type: 'text/csv;charset=utf-8;'
        });
    }else{

        rows = data.map(item => [
            item.id,
            item.latitud.toString().replace('.', ','),
            item.longitud.toString().replace('.', ','),
            `"${item.titulo.replace(/"/g, '""')}"`
        ]);

        csvContent = [
            headers.join(';'),
            ...rows.map(row => row.join(';'))
        ].join('\r\n');

        blob = new Blob(
            ['\uFEFF' + csvContent],
            { type: 'text/csv;charset=utf-8;' }
        );
    }

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = nombre+'.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
};