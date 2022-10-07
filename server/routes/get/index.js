const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({
      include: {
        bg_image: {
          select: {
            secure_url: true,
            original_filename: true,
          },
        },
        favoriteBy: {
          select: {
            name: true,
            id: true,
          },
        },
        auther: {
          select: {
            name: true,
          },
        },
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

module.exports = { getAllPosts, getSignlePost };
