import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { handleFavorite } from '../../../store/Posts';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const CardForGrid = ({ post }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { title, bg_image } = post;
  const { secure_url, original_filename } = bg_image;

  const isLikedByCurrentUser = post?.favoriteBy?.find((fovoriteBy) => fovoriteBy?.id === currentUser?.id)?.id === currentUser?.id;
  const handleLike = () => {
    dispatch(handleFavorite({ postId: post?.id, currentUserId: currentUser?.id, isLikedByCurrentUser }));
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
        <IconButton onClick={handleLike}>
          <Favorite sx={{ fill: `${isLikedByCurrentUser && 'red'}` }} />
        </IconButton>
        <Link to={`/view-post/${post?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button disableRipple color="inherit" sx={{ textTransform: 'none' }}>
            read more
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardForGrid;
