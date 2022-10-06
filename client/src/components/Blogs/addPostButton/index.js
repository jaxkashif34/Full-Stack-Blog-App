import React from 'react';
import { Box, IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const BoxStyles = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.3s ease-in-out',
  ':hover': {
    backgroundColor: theme.palette.primary.contrastText,
  },
  borderRadius: 5,
}));
const AddPost = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <BoxStyles>
      <Link to={`/add-post/${currentUser?.id}`}>
        <IconButton>
          <AddCircle sx={{ fontSize: '5rem' }} />
        </IconButton>
      </Link>
    </BoxStyles>
  );
};

export default AddPost;
