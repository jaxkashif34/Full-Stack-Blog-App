import React from 'react';
import { Button, Card, Modal as MuiModal, Typography, Box, Stack } from '@mui/material';
import { handleModal } from '../../store/UI-Features';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Axios from 'axios';
import { setCurrentUser } from '../../store/Auth';
import { handleSnack } from '../../store/UI-Features';
import { useNavigate } from 'react-router-dom';

const BoxStles = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  padding: 10,
  borderRadius: 10,
}));
const Modal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.UIFeatures);
  const { currentUser } = useSelector((state) => state.auth);
  const handleDelete = async () => {
    dispatch(setCurrentUser(null));

    await Axios({
      method: 'DELETE',
      url: `http://localhost:8000/delete-user/${currentUser.id}`,
    })
      .then((result) => {
        dispatch(handleSnack({ message: result.data.message, isOpen: true }));
      })
      .catch((err) => {
        dispatch(handleSnack({ message: err.message, isOpen: true }));
      });
    navigate('/auth/sign-in');
    dispatch(handleModal(false));
  };
  return (
    <MuiModal open={isModalOpen} onClose={() => dispatch(handleModal(false))}>
      <BoxStles>
        <Typography gutterBottom variant="h5" sx={{ mb: 4 }}>
          Are you sure you want to delete ?
        </Typography>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="contained" color="info" onClick={() => dispatch(handleModal(false))}>
            Calcel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </BoxStles>
    </MuiModal>
  );
};

export default Modal;
