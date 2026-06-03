/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef } from 'react';

export const useLongPress = (onLongPress:(e:any)=>void, onClick:()=>void, delay = 500) => {
    const [isPressing, setIsPressing] = useState(false);
    const timerRef = useRef<number | null>(null);

    const start = useCallback((e:any) => {
        const element = e.target;
        timerRef.current = setTimeout(() => {
        setIsPressing(true);
        if (onLongPress) {
            onLongPress(element);
        }
        }, delay);
    }, [delay, onLongPress]);

    const stop = useCallback(() => {
        clearTimeout(timerRef.current as number);
        if (isPressing) {
        setIsPressing(false);
        } else if (onClick) {
        onClick();
        }
    }, [isPressing, onClick]);

    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
        onTouchCancel: stop,
    };
};
