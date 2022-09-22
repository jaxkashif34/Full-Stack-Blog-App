import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
require('dotenv').config();
const prisma = new PrismaClient();
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ******************** POSTS ********************
// displaying all posts
// careate a post
// display a single post based on uuid
// delete a post based on the uuid
// edit a psot
// ******************** USERS ********************
// displaying the user data name uuid basic profile
// create a user
// delete a user
// edit their profile
// delete something from profile

// implementation of posts
// display all posts
app.get('/', async (req: Request, res: Response) => {
  try {
    const allPosts = await prisma.post.findMany();
    res.json(allPosts);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});
// create a post
app.post('/create-post', async (req: Request, res: Response) => {
  const { postData } = req.body;
  const title: string = postData.title;
  const content: string = postData.content;
  const userId: string = postData.userId;
  const tags: string[] = postData.tags;
  try {
    const createdPost = await prisma.post.create({
      data: {
        title,
        content,
        tags,
        auther: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.send(createdPost);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});
// fetching single post
app.get('/single-post/:id', async (req: Request, res: Response) => {
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
app.delete('/delete-post/:id', async (req: Request, res: Response) => {
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
app.put('/edit-post/:id', async (req: Request, res: Response) => {
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

// create user

app.post('/create-user', async (req: Request, res: Response) => {
  const { userData } = req.body;
  const name: string = userData.name;
  const age: number = userData.age;
  const email: string = userData.email;
  const role = userData.role;
  try {
    const createdUser = await prisma.user.create({
      data: {
        name,
        age,
        email,
        role,
      },
    });
    res.send(createdUser);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
});

// Get Single User

app.get('/single-user/:id', async (req: Request, res: Response) => {
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
app.delete('/delete-user/:id', async (req: Request, res: Response) => {
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

app.put('/edit-user/:id', async (req: Request, res: Response) => {
  const { updatedUser } = req.body;
  const userId: string = req.params.id;
  const name: string = updatedUser.name;
  const email: string = updatedUser.email;
  const age: number = updatedUser.age;
  const role = updatedUser.role;

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
      },
    });

    res.send(editedUser);
  } catch (e) {
    res.send(e);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`⚡️ Server is running at https://localhost:${PORT}`));
