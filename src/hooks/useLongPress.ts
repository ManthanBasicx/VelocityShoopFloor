import { useCallback, useRef } from 'react';

export interface LongPressEvent {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onClick: () => void;
}

interface UseLongPressOptions {
  onLongPress: () => void;
  onClick?: () => void;
  ms?: number;
}

export const useLongPress = ({
  onLongPress,
  onClick,
  ms = 50  // Default interval for continuous execution during long press
}: UseLongPressOptions) => {
  const timerRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timeout>();
  const isLongPressActive = useRef(false);

  const start = useCallback(() => {
    if (!isLongPressActive.current) {
      timerRef.current = setTimeout(() => {
        isLongPressActive.current = true;
        intervalRef.current = setInterval(() => {
          onLongPress();
        }, ms) as unknown as NodeJS.Timeout;
      }, 200); // Initial delay before long press activates
    }
  }, [onLongPress, ms]);

  const stop = useCallback(() => {
    isLongPressActive.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (!isLongPressActive.current && onClick) {
      onClick();
    }
  }, [onClick]);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
    onClick: handleClick,
  };
};