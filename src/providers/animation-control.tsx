import { createContext, FC, ReactNode, useCallback, useContext, useState } from 'react';

const useAppAnimationControlValues = () => {
  const [appAnimationSpeedScale, setAppAnimationSpeedScale] = useState(1);
  const [showBorders, setShowBorders] = useState(false);
  const getAnimationDuration = useCallback(
    (duration: number) => duration / appAnimationSpeedScale,
    [appAnimationSpeedScale]
  );
  return {
    appAnimationSpeedScale,
    setAppAnimationSpeedScale,
    getAnimationDuration,
    showBorders,
    setShowBorders,
  };
};

export type AppAnimationControlValues = ReturnType<typeof useAppAnimationControlValues>;

const AppAnimationControlContext = createContext<AppAnimationControlValues | null>(null);

export const AppAnimationControlProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const value = useAppAnimationControlValues();
  return <AppAnimationControlContext.Provider value={value}>{children}</AppAnimationControlContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppAnimationControl = () => {
  const context = useContext(AppAnimationControlContext);
  if (!context) {
    throw new Error('useAnimationControl must be used within an AnimationControlProvider');
  }
  return context;
};
