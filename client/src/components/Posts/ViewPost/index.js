import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardActions, CardContent, CardMedia, Container, Divider, IconButton, Tooltip, Typography, Stack, Box } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { handleEditPost } from '../../../store/Posts';
import EditPostButton from '../EditPostButton';
const ViewPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { posts } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.auth);
  const currentPost = posts.find((post) => post.id === id);
  const numberOfLikes = currentPost?.favoriteBy.length;
  const isLikedByCurrentUser = currentPost?.favoriteBy?.find((fovoriteBy) => fovoriteBy?.id === currentUser?.id)?.id === currentUser?.id;
  const handleLike = () => {
    const data = { postId: currentPost?.id, currentUserId: currentUser?.id, isLikedByCurrentUser };
    dispatch(handleEditPost(data));
  };
  return (
    <Container maxWidth="md" sx={{ mt: 3, borderRadius: 3, paddingY: 3, paddingX: 1, position: 'relative' }}>
      <Card sx={{ maxWidth: '100%' }}>
        <CardMedia component="img" height="40%" image={currentPost?.bg_image?.secure_url} alt={currentPost?.bg_image?.original_filename} />
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h4" sx={{ display: 'inline-block' }}>
              {currentPost?.title}
            </Typography>
            <EditPostButton />
          </Stack>
          <Typography variant="h5" color="text.secondary">
            {currentPost?.content}
          </Typography>
        </CardContent>
        <Divider sx={{ mx: 2 }} />
        <CardActions>
          <Stack spacing={2} direction="row" justifyContent="space-around" alignItems="center" sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton onClick={handleLike}>
                <Favorite sx={{ fill: `${isLikedByCurrentUser && 'red'}` }} />
              </IconButton>
              <Tooltip title={isLikedByCurrentUser ? (isLikedByCurrentUser && numberOfLikes > 1 ? `you and ${numberOfLikes - 1} more` : `you liked it`) : 'peoples who likes'}>
                <Typography sx={{ p: 0.5 }}>{numberOfLikes}</Typography>
              </Tooltip>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ display: 'inline-block', color: 'gray' }}>
                Last modified
              </Typography>{' '}
              :{' '}
              <Typography variant="caption" sx={{ display: 'inline-block', color: 'gray' }}>
                {currentPost?.updatedAt.slice(0, 10)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ display: 'inline-block', color: 'gray' }}>
                Auther
              </Typography>{' '}
              :{' '}
              <Typography variant="caption" sx={{ display: 'inline-block', color: 'gray' }}>
                {currentPost?.auther?.name}
              </Typography>
            </Box>
          </Stack>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ViewPost;
