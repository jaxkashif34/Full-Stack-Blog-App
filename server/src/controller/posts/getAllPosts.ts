/* A query to get all posts from the database. */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Response, Request } from 'express';
export const getAllPosts = async (req:Request, res:Response) => {
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
    console.log('Error in fetching Posts', e);
    res.status(400).json({ message: 'Error in fetching Posts', message: e });
  }
};
