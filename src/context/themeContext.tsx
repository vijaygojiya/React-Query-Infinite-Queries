import React, {FC, PropsWithChildren} from 'react';
import {createContext, useCallback, useMemo, useState} from 'react';
export interface AppThemeContextProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const AppThemeContext = createContext<AppThemeContextProps>({
  isDark: false,
  toggleTheme: () => {},
});

const ThemeProvider: FC<PropsWithChildren<unknown>> = ({children}) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const value = useMemo(() => {
    return {isDark, toggleTheme};
  }, [isDark, toggleTheme]);

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
};

export default ThemeProvider;
