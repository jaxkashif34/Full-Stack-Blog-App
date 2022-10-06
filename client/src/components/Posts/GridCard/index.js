import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { setLikedPosts } from '../../../store/Posts';
import { handleSnack } from '../../../store/UI-Features';
import { useSelector, useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import Axios from 'axios';
const CardForGrid = ({ post }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { title, bg_image } = post;
  const { secure_url, original_filename } = bg_image;

  const isLiketByCurrentUser = post?.favoriteBy?.find((fovoriteBy) => fovoriteBy?.id === currentUser?.id)?.id === currentUser?.id;
  const handleFavorite = async () => {
    Axios({
      method: 'PUT',
      url: `http://localhost:8000/edit-post/${post?.id}`,
      data: {
        favoritedBy: currentUser?.id,
        isLiked: !isLiketByCurrentUser,
      },
    })
      .then((response) => {
        const isFound = response?.data?.data?.favoriteBy.find((fovoriteBy) => fovoriteBy?.id === currentUser?.id)?.id;
        if (isFound === currentUser?.id) {
          dispatch(setLikedPosts(response?.data?.data));
          dispatch(handleSnack({ message: 'Post Liked', isOpen: true }));
        } else if (response?.data?.data?.favoriteBy?.length === 0) {
          dispatch(setLikedPosts(response?.data?.data));
          storage.removeItem('persist:post');
          dispatch(handleSnack({ message: 'Post Unliked', isOpen: true }));
        }
      })
      .catch((err) => {
        dispatch(handleSnack({ message: err.message, isOpen: true }));
      });
  };
  return (
    <Card>
      <CardMedia component="img" height={140} image={secure_url} alt={original_filename} sx={{ objectFit: 'cover' }} />
      <CardContent>
        <Typography variant="body1" color="inherit">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleFavorite}>
          <Favorite sx={{ fill: `${isLiketByCurrentUser && 'red'}` }} />
        </IconButton>
        <Button disableRipple color="inherit" sx={{ textTransform: 'none' }}>
          read more
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardForGrid;
