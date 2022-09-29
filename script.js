const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const upload = require('./middleware');
const { cloudinary, options } = require('./config');
const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ******************** POSTS ********************
app.get('/all-posts-titles', async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({
      select: {
        title: true,
        id: true,
        createdAt: true,
        bg_image: true,
        autherId: true,
      },
    });
    res.send(allPosts);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});
// create a post
app.post('/create-post', upload, async (req, res) => {
  const file = req.file;
  const { postData } = req.body;
  const { title, content, userId, tags } = postData;

  const uploadToCloudinary = () => {
    return new Promise((resolve, reject) => {
      try {
        cloudinary.uploader.upload(file.path, options, (err, result) => {
          if (err) {
            reject(err);
            res.send(`failed to upload ${file.originalname}`);
          }
          if (result) {
            console.log('result', result);
            resolve(result);
          }
        });
      } catch (e) {
        reject(e);
        res.send(`file upload failed ${e.message}`);
      }
    });
  };

  uploadToCloudinary
    .then((result) => {
      console.log('success', result);
    })
    .catch((err) => {
      console.log('error', err);
    });
  // try {
  //   const createdPost = await prisma.post.create({
  //     data: {
  //       title,
  //       content,
  //       tags,
  //       auther: {
  //         connect: {
  //           id: userId,
  //         },
  //       },
  //     },
  //   });
  //   res.send(createdPost);
  // } catch (e) {
  //   res.send(JSON.stringify(e));
  // }
});
// fetching single post
app.get('/single-post/:id', async (req, res) => {
  const postId: string = req.params.id;
  try {
    const singlePost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    res.send(singlePost);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});

// Delete post
app.delete('/delete-post/:id', async (req, res) => {
  const postId: string = req.params.id;
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.send('Post deleted successfully');
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});

// Edit post
app.put('/edit-post/:id', async (req, res) => {
  const { updatedPost } = req.body;
  const postId: string = req.params.id;
  const title: string = updatedPost.title;
  const content: string = updatedPost.content;
  const tags: string[] = updatedPost.tags;
  try {
    const editedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
        tags: {
          push: tags,
        },
      },
    });
    res.send(editedPost);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});
// ******************** USER ********************
// SIGN-IN USER
app.post('/sign-up', async (req, res) => {
  const { userData } = req.body;
  const name: string = userData.name;
  const age: number = userData.age;
  const email: string = userData.email;
  const password: string = userData.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userDetail = {
    name,
    age,
    email,
    password: hashedPassword,
  };
  try {
    const createdUser = await prisma.user.create({
      data: {
        ...userDetail,
      },
    });
    res.send(createdUser);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});
// SIGN-IN USER
app.get('/log-in', async (req, res) => {
  const { userData } = req.body;
  const email: string = userData.email;
  const password: string = userData.password;

  try {
    if (!email && !password) {
      res.send('Please enter email and password');
      return;
    } else if (!email || !password) {
      res.send('Both email and password are required');
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.send(user);
      } else {
        res.send('Incorrect password');
      }
    } else {
      res.send('User not found');
    }
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});

// Get Single User
app.get('/single-user/:id', async (req, res) => {
  const userId: string = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.send(user);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});

// Delete a User
app.delete('/delete-user/:id', async (req, res) => {
  const userId: string = req.params.id;
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.send('User Deleted Successfully');
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});

// Edit User
app.put('/edit-user/:id', async (req, res) => {
  const { updatedUser } = req.body;
  const userId: string = req.params.id;
  const name: string = updatedUser.name;
  const email: string = updatedUser.email;
  const age: number = updatedUser.age;
  const role = updatedUser.role;
  const password: string = updatedUser.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const editedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        age,
        role,
        password: hashedPassword,
      },
    });

    res.send(editedUser);
  } catch (e) {
    res.send(e);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`⚡️ Server is up on https://localhost:${PORT}`));
