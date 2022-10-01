import React from 'react';
import { IconButton } from '@mui/material';
import { DarkMode, LightMode, ExpandLess } from '@mui/icons-material';
import { setDarkMode } from '../../store/UI-Features';
import { useDispatch, useSelector } from 'react-redux';
import useDarkMode from '../../assets/mode';

const BottomBar = () => {
  const { isDark } = useSelector((state) => state.UIFeatures);
  const dispatch = useDispatch();

  const [isDarkInStore, setDarkModeInStore] = useDarkMode();

  const handleMode = () => {
    setDarkModeInStore(!isDarkInStore);
    dispatch(setDarkMode(isDark));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <IconButton size="large" color="primary" onClick={handleMode} sx={{ position: 'fixed', bottom: '1rem', left: '1rem' }}>
        {isDark ? <LightMode /> : <DarkMode />}
      </IconButton>
      <IconButton size="large" color="primary" onClick={scrollToTop} sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
        <ExpandLess fontSize="20" />
      </IconButton>
    </>
  );
};

export default BottomBar;
