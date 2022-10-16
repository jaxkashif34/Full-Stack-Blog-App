/* The code is a modal component that is used to delete a user. */
import React from 'react';
import { Button, Card, Modal as MuiModal, Typography, Stack } from '@mui/material';
import { handleModal } from '../../store/UI-Features';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { handleDeleteUser } from '../../store/Auth';
import { handleUserMenu } from '../../store/UI-Features';
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
    const data = {
      currentUserId: currentUser.id,
    };
    dispatch(handleModal(false));
    dispatch(handleUserMenu(false));
    await dispatch(handleDeleteUser(data));
    navigate('/auth/sign-in');
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
