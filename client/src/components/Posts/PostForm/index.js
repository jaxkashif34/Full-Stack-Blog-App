import React from 'react';
import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextareaAutosize } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
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
const PostForm = ({ data }) => {
  const { picture, handleChangeProfile, handleChangeTitle, tagsName, handleChange, handlePost, handleChangeContent, post, loading } = data;
  const theme = useTheme();
  function getStyles(tag, tagName, theme) {
    return {
      fontWeight: tagName.indexOf(tag) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
  }
  return (
    <>
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

            <LoadingButton variant="contained" onClick={handlePost} loading={loading}>
              Post
            </LoadingButton>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextAreaStyles name="title" type="text" placeholder="Body" minRows={9} minLength={1} value={post.content} onChange={(e) => handleChangeContent(e.target.value)} />
        </Grid>
      </Grid>
    </>
  );
};

export default PostForm;
