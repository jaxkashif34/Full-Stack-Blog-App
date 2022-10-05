const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { upload } = require('./server/middleware');
const { createPost, createUser, loginSignInUser } = require('./server/routes/post');
const { editPost, editUser } = require('./server/routes/put');
const { deletePost, deleteUser } = require('./server/routes/delete');
const { getAllPosts, getSignlePost, getSignleUser } = require('./server/routes/get');
const app = express();
app.use(cors());
app.use(express.json());

// ******************** POSTS ********************
app.get('/all-posts-titles', getAllPosts);

app.post('/create-post', upload.single('bg_image'), createPost);
// fetching single post
app.get('/single-post/:id', getSignlePost);

// Delete post
app.delete('/delete-post/:id', deletePost);

// Edit post
app.put('/edit-post/:id', editPost);
// ******************** USER ********************
// SIGN-UP USER
app.post('/sign-up', upload.single('profile_pic'), createUser);
// SIGN-IN USER
app.post('/log-in', loginSignInUser);

// Get Single User
app.get('/single-user/:id', getSignleUser);

// Delete a User
app.delete('/delete-user/:id', deleteUser);

// Edit User
app.put('/edit-user/:id', upload.single('profile_pic'), editUser);

app.post('/profile_pic', upload.single('profile_pic'), (req, res) => {
  const file = req.file;
  if (file) {
    res.send(file);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`⚡️ Server is up on https://localhost:${PORT}`));
