import { ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { themeObj } from './theme';
import { useSelector, useDispatch } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { setDarkMode } from '../../store/UI-Features';
export const ThemeConfig = ({ children }) => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.UIFeatures.isDark);
  const theme = useMemo(() => themeObj(isDark), [isDark]);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const osTheme = e.matches;
    dispatch(setDarkMode(osTheme));
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
