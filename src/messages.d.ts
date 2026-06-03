/* eslint-disable @typescript-eslint/no-explicit-any */
// src/messages.d.ts
declare module '*.json' {
const value: any;
    export default value;
}

export interface Messages {
    [key: string]: string | undefined;
}