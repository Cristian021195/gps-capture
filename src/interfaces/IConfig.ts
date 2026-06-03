export interface IConfig {
  font_size: string;
  night_mode: boolean;
  effects: boolean;
  sound: boolean;
  zoom: boolean;
  lang: string;
  setFontSize: (v: string) => void;
  setLang: (v: string) => void;
  switchNightMode: () => void;
  switchEffects: () => void;
  switchSound: () => void;
  switchZoom: () => void;
}