// /* The above code is deleting a post and a user from the database. */
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// import { Response, Request } from 'express';
// export const deletePost = async (req: Request, res: Response) => {
//   const postId = req.params.id;
//   try {
//     await prisma.post.delete({
//       where: {
//         id: postId,
//       },
//     });
//     res.json({ message: 'Post deleted successfully' });
//   } catch (e) {
//     res.status(400).json({ message: 'Error deleting post', error: e });
//   }
// };