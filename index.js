/* The above code is a server.js file that is used to create a server. */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { upload } = require('./server/middleware');
const { createPost, createUser, loginSignInUser } = require('./server/routes/post');
const { editPost, editUser } = require('./server/routes/put');
const { deletePost, deleteUser } = require('./server/routes/delete');
const { getAllPosts } = require('./server/routes/get');
const app = express();
const path = require('path');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV === 'production') {
  app.post('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });
}

// ******************** POSTS ********************
app.get('/all-posts', getAllPosts);

app.post('/create-post', upload.single('bg_image'), createPost);

// Delete post
app.delete('/delete-post/:id', deletePost);

// Edit post
app.put('/edit-post/:id', upload.single('bg_image'), editPost);
// ******************** USER ********************
// SIGN-UP USER
app.post('/sign-up', upload.single('profile_pic'), createUser);
// SIGN-IN USER
app.post('/log-in', loginSignInUser);

// Delete a User
app.delete('/delete-user/:id', deleteUser);

// Edit User
app.put('/edit-user/:id', upload.single('profile_pic'), editUser);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`⚡️ Server is up on http://localhost:${PORT}`));
