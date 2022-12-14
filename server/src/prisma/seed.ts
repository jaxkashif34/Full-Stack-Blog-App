import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seed = async () => {
  const kashif = await prisma.user.create({
    data: {
      name: 'Kashif Ali',
      email: 'kashif@gmail.com',
      password: '123456',
      role: 'ADMIN',
      DOB: new Date('9-25-1999'),
      emailUpdates: false,
    },
  });
  const tayyab = await prisma.user.create({
    data: {
      name: 'Tayyab Tahir',
      email: 'tayyab@gmail.com',
      password: '123456',
      role: 'AUTHER',
      DOB: new Date('10-20-2000'),
      emailUpdates: true,
    },
  });

  const post1 = await prisma.post.create({
    data: {
      title: 'First Post',
      body: 'This is the first post',
      auther: {
        connect: {
          id: kashif.id,
        },
      },
      tags: ['tech', 'programming', 'javascript'],
      favoriteBy: {
        connect: {
          id: tayyab.id,
        },
      },
    },
  });
};
seed();
