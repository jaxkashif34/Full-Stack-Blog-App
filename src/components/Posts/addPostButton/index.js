/* A component that is used to add a post. */
import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
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
  return (
    <BoxStyles>
      <Tooltip title="Add Post" arrow>
        <Link to="/add-post">
          <IconButton>
            <AddCircle sx={{ fontSize: '5rem' }} />
          </IconButton>
        </Link>
      </Tooltip>
    </BoxStyles>
  );
};

export default AddPost;
