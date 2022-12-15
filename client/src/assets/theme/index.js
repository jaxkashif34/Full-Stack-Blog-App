/**
 * It's a function that takes in a child component and returns a theme provider that uses the theme
 * object and the isDark boolean from the redux store to determine the theme.
 * @returns A function that returns a component.
 */
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
