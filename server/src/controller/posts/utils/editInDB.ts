import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Post {
  title: string;
  body: string;
  tags: string[];
}

export const editInDB = async (post: Post, img: any | undefined, posstId: string) => {
  try {
    const { tags } = await prisma.post.findUnique({
      where: {
        id: posstId,
      },
      select: {
        tags: true,
      },
    });

    return await prisma.post.update({
      where: {
        id: posstId,
      },
      data: {
        title: post.title,
        body: post.body,
        tags: {
          set: [...tags, ...post.tags],
        },
        ...(img != null && {
          postImg: {
            update: {
              ...img,
            },
          },
        }),
      },
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};
