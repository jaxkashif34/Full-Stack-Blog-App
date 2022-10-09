/**
 * It takes the id from the url and finds the post with that id in the posts array. Then it returns a
 * link to the edit page for that post
 * @returns A function that returns a component.
 */
import React from 'react';
import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const EditPostButton = () => {
  const { id } = useParams();
  const { posts } = useSelector((state) => state.post);
  const currentPost = posts.find((post) => post.id === id);
  return (
    <Link to={`/edit-post/${currentPost.id}`}>
      <IconButton sx={{ display: 'inline-block' }}>
        <Edit />
      </IconButton>
    </Link>
  );
};

export default EditPostButton;
