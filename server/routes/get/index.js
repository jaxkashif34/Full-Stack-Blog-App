/* A query to get all posts from the database. */
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
    res.json({ message: 'Fetched All Posts', data: allPosts });
  } catch (e) {
    res.status(400).json({ message: 'Error in fetching  Posts', message: e });
  }
};

module.exports = { getAllPosts };
