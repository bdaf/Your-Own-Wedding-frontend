import { createContext, useEffect, useState } from "react";

interface Props {
  children: any;
}

interface WindowSize {
  width: number;
  height: number;
}

const WindowSizeContext = createContext({
  width: 0,
  height: 0,
  isWindowMoreWiderThan: (_value: number): boolean => {
    return false;
  },
  isWindowMoreHigherThan: (_value: number): boolean => {
    return false;
  },
  isWindowLessWiderThan: (_value: number): boolean => {
    return false;
  },
  isWindowLessHigherThan: (_value: number): boolean => {
    return false;
  },
});

export function WindowSizeContextProvider({ children }: Props) {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function isWindowMoreWiderThanHandler(_value: number) {
    return _value < windowSize.width;
  }

  function isWindowMoreHigherThanHandler(_value: number) {
    return _value < windowSize.height;
  }

  function isWindowLessWiderThanHandler(_value: number) {
    return _value > windowSize.width;
  }

  function isWindowLessHigherThanHandler(_value: number) {
    return _value > windowSize.height;
  }

  const context = {
    width: windowSize.width,
    height: windowSize.height,
    isWindowMoreWiderThan: isWindowMoreWiderThanHandler,
    isWindowMoreHigherThan: isWindowMoreHigherThanHandler,
    isWindowLessWiderThan: isWindowLessWiderThanHandler,
    isWindowLessHigherThan: isWindowLessHigherThanHandler,
  };

  return (
    <WindowSizeContext.Provider value={context}>
      {children}
    </WindowSizeContext.Provider>
  );
}

export default WindowSizeContext;
