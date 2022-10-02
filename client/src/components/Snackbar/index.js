import React from 'react';
import { Snackbar, Slide, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { handleSnack } from '../../store/UI-Features';
import { Close } from '@mui/icons-material';
const SnackBar = () => {
  const dispatch = useDispatch();
  const { snack } = useSelector((state) => state.UIFeatures);
  const { isOpen, message } = snack;
  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => dispatch(handleSnack({ message: '', isOpen: false }))}
      message={message}
      key={'first-snackbar'}
      autoHideDuration={3000}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => dispatch(handleSnack({ message: '', isOpen: false }))}>
          <Close fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default SnackBar;
