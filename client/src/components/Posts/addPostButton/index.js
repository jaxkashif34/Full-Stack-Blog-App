import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const BoxStyles = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.3s ease-in-out',
  ':hover': {
    backgroundColor: theme.palette.primary.contrastText,
  },
  borderRadius: 5,
  padding: '5rem 0',
}));
const AddPost = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <BoxStyles>
      <Tooltip title="Add Post" arrow>
        <Link to={`/add-post/${currentUser?.id}`}>
          <IconButton>
            <AddCircle sx={{ fontSize: '5rem' }} />
          </IconButton>
        </Link>
      </Tooltip>
    </BoxStyles>
  );
};

export default AddPost;
