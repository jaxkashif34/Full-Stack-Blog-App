const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const editPost = async (req, res) => {
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
};
const editUser = async (req, res) => {
  const { name, email, age, role, password } = req.body;
  const userId = req.params.id;
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
};
module.exports = { editPost, editUser };
