export function getPlatform(){
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return "ios";
    }
    if (/android/i.test(userAgent)) {
        return "material";
    }
    return "material";
}

export const validateDisplayMode = (variant: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser') => {
  const mediaMatch = window.matchMedia(`(display-mode: ${variant})`).matches;

  const isStandaloneIOS =
    variant === 'standalone' &&
    'standalone' in window.navigator &&
    // casting seguro
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

  return mediaMatch || isStandaloneIOS;
};

export function getBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
        return "chrome";
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        return "opera";
    } else if (userAgent.includes("Firefox")) {
        return "firefox";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        return "safari";
    } else if (userAgent.includes("Edg")) {
        return "edge";
    } else {
        return "chrome";
    }
}

export function getLang(){
    let l = 'en';
    const lang = navigator?.language?.split('-');
    if(lang){
        if(lang.length >= 1){
            l = lang[0];
        }
    }
    return l;
}