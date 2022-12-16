import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Post {
  title: string;
  body: string;
  tags: string[];
}

export const saveInDB = async (post: Post, img: any, autherId: string) => {
  try {
    return await prisma.post.create({
      data: {
        ...post,
        bgImg: {
          create: {
            ...img,
          },
        },
        auther: {
          connect: {
            id: autherId,
          },
        },
      },
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};
