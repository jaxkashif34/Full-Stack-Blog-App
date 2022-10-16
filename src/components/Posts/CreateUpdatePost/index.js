/**
 * I'm trying to create a post and edit a post.
 * @returns The return value of the function is the value of the last expression evaluated inside the
 * function.
 */
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { handleCreatePost, handleEditPost } from '../../../store/Posts';
import { useNavigate, useLocation } from 'react-router-dom';
import PostForm from '../PostForm';
import { handleSnack } from '../../../store/UI-Features';

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const { pathname } = useLocation();
  const isAddPost = pathname?.split('/')[1] === 'add-post';
  const postId = pathname?.split('/')[2];
  const [tagsName, setTagsName] = useState(['new']);
  const [post, setPost] = useState({ title: '', content: '' });
  const [picture, setPicture] = useState({ file: null, path: '' });
  const [loading, setLoading] = useState(false);
  const currentPost = posts?.find((post) => post?.id === postId);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTagsName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value?.split(',') : value
    );
  };
  const handleChangeProfile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPicture({ file, path: reader.result });
    };
  };
  const handleChangeTitle = (title) => {
    setPost({ ...post, title });
  };
  const handleChangeContent = (content) => {
    setPost({ ...post, content });
  };

  const handlePost = async () => {
    const isTitleEmpty = post?.title === '';
    const isContentEmpty = post?.content === '';
    if (isTitleEmpty || isContentEmpty) {
      dispatch(handleSnack({ message: `Please Add ${isTitleEmpty && 'Title'} ${isContentEmpty && 'Body'} ${isTitleEmpty && isContentEmpty && 'Title & Body'}`, isOpen: true }));
    } else if (!(isTitleEmpty && isContentEmpty)) {
      setLoading(true);
      if (isAddPost) {
        const data = {
          title: post.title,
          content: post.content,
          file: picture.file,
          tagsName,
          currentUserId: currentUser?.id,
        };
        await dispatch(handleCreatePost(data));
        setLoading(false);
        navigate('/');
      } else {
        const data = {
          title: post.title,
          content: post.content,
          tagsName,
          file: picture.file,
          currentUserId: currentUser.id,
          postId,
        };
        await dispatch(handleEditPost(data));
        setLoading(false);
        navigate('/');
      }
    }
  };

  useEffect(() => {
    if (!isAddPost) {
      setTagsName(currentPost?.tags);
      setPost({ title: currentPost?.title, content: currentPost?.content });
      setPicture({ file: null, path: currentPost?.bg_image?.secure_url });
    }
  }, [postId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container sx={{ padding: 2, borderRadius: 3 }}>
      <Typography variant="h4">{isAddPost ? 'Create Post' : 'Edit Post'}</Typography>
      <PostForm data={{ picture, handleChangeProfile, handleChangeTitle, tagsName, handleChange, handlePost, handleChangeContent, post, loading }} />
    </Container>
  );
};

export default AddPost;
