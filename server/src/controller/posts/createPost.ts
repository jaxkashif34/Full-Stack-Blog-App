import { Response } from 'express';
import { upload } from '../../middleware';
import { errors } from '../../utils/errors';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { verifyToken } from '../../utils/token';
import { createPostValidaiotn } from '../../utils/validation/posts/createPost';
import { PrismaClient } from '@prisma/client';
import { uploadToCloudinary } from '../../config/cloudniary-config';
import { saveInDB } from './utils/saveInDB';
const prisma = new PrismaClient();

export const createPost = [
  verifyToken('accessToken'),
  upload.single('postImg'),
  ...createPostValidaiotn,
  async (req: GetUserAuthInfoRequest, res: Response) => {
    const { title, body, tags } = req.body;

    if (errors(req).length > 0) return res.status(400).json({ errors: errors(req) });

    if (!req.file) {
      return res.status(400).json({ errors: 'Please upload a profile picture' });
    }
    const { originalname, path } = req.file;

    const postData = {
      title,
      body,
      tags: JSON.parse(tags),
    };

    const imgData = await uploadToCloudinary({ path, originalname });

    const post = await saveInDB(postData, imgData, req.user?.userId);

    res.json({ post });
  },
];
// export const createPost = async (req:Request, res:Response) => {
//     const file = req.file;
//     const { title, content, autherId, tags } = req.body;

//     const userDetails = {
//       title,
//       content,
//       tags: JSON.parse(tags),
//     };

//     const saveInDataBase = (imgObj) => {
//       return new Promise(async (resolve, reject) => {
//         try {
//           const createdPost = await prisma.post.create({
//             data: {
//               ...userDetails,
//               bg_image: {
//                 create: {
//                   ...imgObj,
//                 },
//               },
//               auther: {
//                 connect: {
//                   id: autherId,
//                 },
//               },
//             },
//             include: {
//               bg_image: true,
//               auther: {
//                 select: {
//                   id: true,
//                   name: true,
//                 },
//               },
//             },
//           });

//           resolve(createdPost);
//         } catch (err) {
//           reject(err);
//         }
//       });
//     };

//     uploadToCloudinary(file)
//       .then(async (result) => {
//         const imgObj = {
//           width: result.width,
//           height: result.height,
//           asset_id: result.asset_id,
//           created_at: result.created_at,
//           bytes: result.bytes,
//           secure_url: result.secure_url,
//           original_filename: result.original_filename,
//         };

//         saveInDataBase(imgObj)
//           .then((result) => {
//             res.json({ message: 'Post created successfully', data: result });
//           })
//           .catch((err) => {
//             console.log('Error in creating post', err);
//             res.json({ message: 'Error in creating post', error: err });
//           });
//       })
//       .catch((err) => {
//         console.log('Error in uploading', err);
//         res.status(400).send({ message: 'Error in uploading', error: err });
//       });
//   };
