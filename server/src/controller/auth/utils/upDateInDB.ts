import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { FIELDS } from './fields';
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

export const updateInDatabase = async (user: User, img: any, id: string) => {
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
        profilePic: {
          update: {
            ...img,
          },
        },
      },
      select: FIELDS,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};