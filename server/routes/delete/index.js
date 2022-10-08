const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const deletePost = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  prisma.user
    .delete({
      where: {
        id: userId,
      },
    })
    .then(() => {
      res.json({ message: 'User Deleted Successfully' });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

module.exports = { deletePost, deleteUser };
