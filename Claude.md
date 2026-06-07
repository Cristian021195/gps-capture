# PROYECTO: GPS CAPTURE

Aplicación web para el guardado de puntos GPS con asistencia de proveedores de GPS externos.
Los puntos son tomados manualmente con un botón, y se almacenan en una base de datos con dexiejs.

Para los proveedores usa un patrón de diseño de tipo strategy


## Stack

- React 19
- TypeScript
- Vite + Vite PWA
- Dexie.js (IndexedDB)
- React Router
- Zustand
- Tailwind CSS
- Konsta UI
- React Intl


## Arquitectura

- `src/interfaces`: interfaces que definen las estructuras del proyecto. IEntidades.ts
- `src/api`: funciones que contienen requests mediante fetch api y pueden ser usadas por tanstack query
- `src/services`: gestion de servicios como actualizaciones de tablas de dexie, y demas
- `src/app`: contiene enrutador y hook global para detectar la conectividad a internet y otros eventos relacionados
- `src/assets`: contiene archivos, imagenes, videos, etc.
- `src/classes`: clases propias para nuestro uso en la app, trabaja en conjunto con otras, con /utils y /helpers
- `src/components`: componentes de react /floating /forms /layout (interno) /lists /onboarding /svg  /ui (small) /tables
- `src/config`: archivos de configuracion de librerias u otros
- `src/constants`: archivos de variables globales usados a lo largo del proyecto
- `src/db`: archivo db.ts con la configuración de dexie y definicion de sus tablas
- `src/docs`: contiene aclaraciones mas detalladas del proyecto o funcionalidades claves del mismo
- `src/helpers`: funciones reutilizables para todo el proyecto
- `src/hooks`: custom hooks, hooks relacionados a dexie, y queries de tanstack
- `src/json`: contiene archivos json y jsonc de documentacion y de uso general
- `src/layouts`: layouts generales que usa la aplicación con react router
- `src/pages`: páginas generales que usan con react router
- `src/router`: router protegidos, públicos o privados y definicion en general
- `src/store`: stores de zustand para estado global
- `src/translations`: archivos json de traducciones para react-intl
- `src/utils`: funciones normalmente puras, que no dependen del dominio de la aplicación, generación de archivos .csv

## Convenciones

- Usar TypeScript estricto.
- Preferir componentes funcionales.
- Solo se usan clases para la lógica y los datos, no para renderizado.
- Mantener lógica de negocio fuera de los componentes.
- Las consultas a IndexedDB deben pasar por /hooks con la terminologia useCustomHookDB


## Instrucciones para Claude

- Proyecto React + TypeScript + Vite.
- Usamos Dexiejs como base de datos local.
- Usamos Konsta UI como librería de UI.
- No introducir nuevas librerías sin justificación.
- Priorizar soluciones simples.
- Siempre enfocarse en la estructura `src/interfaces/IEntidades, src/db/db.ts`.
- Evitar `any`.