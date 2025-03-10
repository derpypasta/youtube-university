"use client";

import React, { useCallback, useEffect, useState } from "react";

interface DimensionObject {
  width: number;
  height: number;
}

export function useDimensions(
  ref: React.RefObject<HTMLElement>,
  debounceDelay = 200
): DimensionObject {
  const [dimensions, setDimensions] = useState<DimensionObject>({
    width: 0,
    height: 0,
  });

  const debounce = (fn: Function, ms: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, ms);
    };
  };

  const updateDimensions = useCallback(() => {
    if (ref.current) {
      const { offsetWidth, offsetHeight } = ref.current;
      setDimensions({
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  }, [ref]);

  useEffect(() => {
    const debouncedUpdateDimensions = debounce(updateDimensions, debounceDelay);

    updateDimensions();
    window.addEventListener("resize", debouncedUpdateDimensions);

    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions);
    };
  }, [debounceDelay, updateDimensions]);

  return dimensions;
}