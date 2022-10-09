/**
 * It takes a boolean value and returns a theme object.
 * @param isDark - boolean
 * @returns A function that returns a theme object.
 */
import { createTheme } from '@mui/material/styles';
export const themeObj = (isDark) => {
  return createTheme({
    palette: { mode: isDark ? 'dark' : 'light' },
  });
};
