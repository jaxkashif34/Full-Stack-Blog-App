/**
 * It maps over the posts array and returns a GridCard component for each post
 * @returns An array of objects.
 */
import React from 'react';
import { Container, Grid } from '@mui/material';
import GridCard from '../Post';
import { useSelector } from 'react-redux';
import AddPost from '../addPostButton';
const AllBlogs = () => {
  const { posts } = useSelector((state) => state.post); // Get posts from redux store
  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Grid container spacing={3}>
        {posts.length !== 0 ? (
          <>
            {posts.map((post) => {
              return (
                <Grid item xs={12} md={6} lg={3} key={post.id}>
                  <GridCard post={post} />
                </Grid>
              );
            })}
            <Grid item xs={12} md={6} lg={3}>
              <AddPost />
            </Grid>
          </>
        ) : (
          <Grid item xs={12} md={6} lg={3}>
            <AddPost />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default AllBlogs;
