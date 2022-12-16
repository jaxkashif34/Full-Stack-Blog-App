import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { SELECT_FIELDS } from './fields';
enum Role {
  ADMIN = 'ADMIN',
  AUTHER = 'AUTHER',
}

interface User {
  name: string;
  email: string;
  role: Role;
  emailUpdates: boolean;
  DOB: Date;
  password: string;
}

export const saveInDabases = async (user: User, img: any) => {
  try {
    return await prisma.user.create({
      data: {
        ...user,
        profilePic: {
          create: {
            ...img,
          },
        },
      },
      select: SELECT_FIELDS,
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};
