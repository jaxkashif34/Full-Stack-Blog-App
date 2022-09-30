const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({
      select: {
        title: true,
        id: true,
        createdAt: true,
        bg_image: {
          select: {
            secure_url: true,
            original_filename: true,
          },
        },
        autherId: true,
      },
    });
    res.send(allPosts);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
};

const getSignlePost = async (req, res) => {
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
};

const getSignleUser = async (req, res) => {
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
};

module.exports = { getAllPosts, getSignlePost, getSignleUser };
