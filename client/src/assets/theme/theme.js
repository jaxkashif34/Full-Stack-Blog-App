import { createTheme } from '@mui/material/styles';
export const themeObj = (isDark) => {
  return createTheme({
    palette: { mode: isDark ? 'dark' : 'light' },
  });
};
