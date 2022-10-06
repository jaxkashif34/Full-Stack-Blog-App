import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, Chip, Container, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextareaAutosize, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { handleSnack, addPosts } from '../../../store/UI-Features';
const UploadImage = styled(Box)(({ theme }) => ({
  width: 300,
  height: 150,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px dotted #ccc',
  margin: '0 auto',
  borderRadius: 5,
}));

const TextAreaStyles = styled(TextareaAutosize)(({ theme }) => ({
  // design the textarea
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  '&:focus': {
    outline: 'none',
    border: '1px solid #000',
  },
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'gray',
}));
const tags = ['prisma', 'javaScript', 'typeScript'];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddPost = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const theme = useTheme();
  const [tagsName, setTageName] = useState(['new']);
  const [post, setPost] = useState({ title: '', content: '' });
  const [picture, setPicture] = useState({ file: null, path: '' });

  function getStyles(tag, tagName, theme) {
    return {
      fontWeight: tagName.indexOf(tag) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
  }
  const handleChangeProfile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPicture({ file, path: reader.result });
    };

    setPicture({ file: file, path: URL.createObjectURL(file) });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTageName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleChangeTitle = (title) => {
    setPost({ ...post, title });
  };
  const handleChangeContent = (content) => {
    setPost({ ...post, content });
  };

  const handlePost = async () => {
    const data = new FormData();
    const { title, content } = post;
    const { file } = picture;
    const dataToSend = { title, content, tags: JSON.stringify(tagsName), bg_image: file, autherId: currentUser.id };

    Object.keys(dataToSend).forEach((key) => {
      data.append(key, dataToSend[key]);
    });

    Axios({ url: 'http://localhost:8000/create-post', method: 'POST', data })
      .then((response) => {
        dispatch(addPosts(response.data.data));
        dispatch(handleSnack({ isOpen: true, message: response.data.message }));
      })
      .catch((err) => {
        dispatch(handleSnack({ isOpen: true, message: err.data.message }));
      });
  };

  return (
    <Container sx={{ padding: 2, borderRadius: 3 }}>
      <Typography variant="h4">Create Your Post</Typography>
      <UploadImage>
        {picture.file == null ? (
          <Button component="label">
            Upload
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                handleChangeProfile(e.target.files[0]);
              }}
            />
          </Button>
        ) : (
          <img src={picture.path} alt="post" width="100%" height="100%" />
        )}
      </UploadImage>

      <Grid container sx={{ mt: 4 }} spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <TextAreaStyles name="title" type="text" placeholder="Title" minRows={2} minLength={1} value={post.title} onChange={(e) => handleChangeTitle(e.target.value)} />
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={tagsName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
                renderValue={(selected) => {
                  return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value, i) => (
                        <Chip key={i} label={value} />
                      ))}
                    </Box>
                  );
                }}
                MenuProps={MenuProps}>
                {tags.map((tag, i) => (
                  <MenuItem key={i} value={tag} style={getStyles(tag, tagsName, theme)}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" onClick={handlePost}>
              Post
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextAreaStyles name="title" type="text" placeholder="Body" minRows={9} minLength={1} value={post.content} onChange={(e) => handleChangeContent(e.target.value)} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddPost;
