import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const getFromStorage = (key) => {
        const getvalue = localStorage.getItem(key);
        return getvalue ? JSON.parse(getvalue) : initialValue;
      };
      return getFromStorage(key);
    } catch (e) {
      console.log(e);
      return initialValue;
    }
  });

  const setToStorage = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (e) {
      console.log(e);
    }
  };
  return [storedValue, setToStorage];
};

const useDarkMode = () => {
  const initialValue = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDark, setDarkMode] = useLocalStorage('dark-mode', initialValue);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const osTheme = e.matches;
    setDarkMode(osTheme);
  });

  return [isDark, setDarkMode];
};

export default useDarkMode;
