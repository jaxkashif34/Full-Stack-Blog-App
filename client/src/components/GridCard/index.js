import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
const CardForGrid = ({ post }) => {
  const { id, title, createdAt, bg_image, autherId } = post;
  const { secure_url, original_filename } = bg_image;
  return (
    <Card>
      <CardMedia component="img" height={140} image={secure_url} alt={original_filename} />
      <CardContent>
        <Typography variant="body1" color="inherit">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <Favorite />
        </IconButton>
        <Button disableRipple color="inherit" sx={{ textTransform: 'none' }}>
          read more
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardForGrid;
