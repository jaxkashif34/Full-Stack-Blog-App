import { ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { themeObj } from './theme';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';
export const ThemeConfig = ({ children }) => {
  const isDark = useSelector((state) => state.UIFeatures.isDark);
  const theme = useMemo(() => themeObj(isDark), [isDark]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
