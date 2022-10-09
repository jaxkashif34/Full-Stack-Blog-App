/**
 * It's a function that takes a post object as a parameter and returns a card component that displays
 * the post's title and image.
 * @returns The return value of the function is the value of the last expression in the function body.
 */
import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
import { Favorite, Delete } from '@mui/icons-material';
import { handleEditPost, handleDeletePost } from '../../../store/Posts';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const CardForGrid = ({ post }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { title, bg_image } = post;
  const { secure_url, original_filename } = bg_image;

  const isLikedByCurrentUser = post?.favoriteBy?.find((fovoriteBy) => fovoriteBy?.id === currentUser?.id)?.id === currentUser?.id;
  const handleLike = () => {
    const data = { postId: post?.id, currentUserId: currentUser?.id, isLikedByCurrentUser };
    dispatch(handleEditPost(data));
  };
  const handleRemovePost = () => {
    const data = {
      postId: post.id,
    };
    dispatch(handleDeletePost(data));
  };
  return (
    <Card>
      <CardMedia component="img" height={140} image={secure_url} alt={original_filename} sx={{ objectFit: 'cover' }} />
      <CardContent>
        <Typography variant="body1" color="inherit">
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Tooltip title={`${!isLikedByCurrentUser ? 'Like' : 'Unlike'}  Post`}>
          <IconButton onClick={handleLike}>
            <Favorite sx={{ fill: `${isLikedByCurrentUser && 'red'}` }} />
          </IconButton>
        </Tooltip>
        <Link to={`/view-post/${post?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button disableRipple color="inherit" sx={{ textTransform: 'none' }}>
            read more
          </Button>
        </Link>
        <Tooltip title="Delete Post">
          <IconButton onClick={handleRemovePost}>
            <Delete />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default CardForGrid;
