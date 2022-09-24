import React from 'react';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DarkMode, LightMode, ExpandLess } from '@mui/icons-material';
import { setDarkMode } from '../../store/UI-Features';
import { useDispatch, useSelector } from 'react-redux';
import useDarkMode from '../../assets/mode';

const BottomBarStyles = styled(Box)(({ theme }) => {
  return {
    position: 'fixed',
    bottom: 15,
    backgroundColor: 'transparent',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.4rem 2rem',
  };
});
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
    <BottomBarStyles>
      <IconButton size="large" color="primary" onClick={handleMode}>
        {isDark ? <LightMode /> : <DarkMode />}
      </IconButton>
      <IconButton size="large" color="primary" onClick={scrollToTop}>
        <ExpandLess fontSize="20" />
      </IconButton>
    </BottomBarStyles>
  );
};

export default BottomBar;
