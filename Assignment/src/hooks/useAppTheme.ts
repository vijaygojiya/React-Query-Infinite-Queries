import {useContext} from 'react';
import {AppThemeContext} from '../context/themeContext';

export default function useAppTheme() {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error('useTheme must call inside theme provider');
  }

  return context;
}
