const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const upload = require('./server/middleware');
const { cloudinary, options } = require('./server/config');
const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const main = async () => {
//   const createPost = await prisma.post.create({
//     data: {
//       title: 'This is test title',
//       content: 'This is test content',
//       autherId: '4593c1ff-4ce8-49b1-a0d0-e8b5be6bd82c',
//       tags: ['new', 'test'],
//       bg_image:{
//         c
//       }
//     },
//   });
//   // const createUser = await prisma.user.create({
//   //   data: {
//   //     name: 'Shair Ali',
//   //     age: 25,
//   //     password: 'This is test password',
//   //     date_of_birth: new Date(),
//   //     email: 'test@example.com',
//   //     writterPost:{

//   //     }
//   //   },
//   // });
// };

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
  const { title, content, autherId, tags } = req.body;
  const tagsArr = JSON.parse(tags);
  // const { title, content, autherId, tags } = postData;

  const uploadToCloudinary = () => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, options, (err, result) => {
        if (err) {
          reject(err);
          res.send(`failed to upload ${file.originalname}`);
        }
        if (result) {
          resolve(result);
        }
      });
    });
  };

  uploadToCloudinary()
    .then(async (result) => {
      const imgObj = {
        width: result.width,
        height: result.height,
        asset_id: result.asset_id,
        created_at: result.created_at,
        bytes: result.bytes,
        secure_url: result.secure_url,
        original_filename: result.original_filename,
      };

      const createdPost = await prisma.post.create({
        data: {
          title,
          content,
          autherId,
          tags: tagsArr,
          bg_image: {
            create: {
              ...imgObj,
            },
          },
        },
        include: {
          bg_image: true,
        },
      });

      res.send({ message: 'Post created successfully', data: createdPost });
    })
    .catch((err) => {
      res.status(400).send({ message: 'Error in saving data into database', error: err });
    });
});
// fetching single post
app.get('/single-post/:id', async (req, res) => {
  const postId = req.params.id;
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
  const postId = req.params.id;
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
  const postId = req.params.id;
  const title = updatedPost.title;
  const content = updatedPost.content;
  const tags = updatedPost.tags;
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
// SIGN-UP USER
app.post('/sign-up', async (req, res) => {
  const { userData } = req.body;
  const { name, age, email, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userDetail = {
    name,
    age,
    email,
    role,
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
  const email = userData.email;
  const password = userData.password;

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
  const userId = req.params.id;
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
  const userId = req.params.id;
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
  const userId = req.params.id;
  const name = updatedUser.name;
  const email = updatedUser.email;
  const age = updatedUser.age;
  const role = updatedUser.role;
  const password = updatedUser.password;
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
