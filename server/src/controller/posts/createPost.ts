// // create a post
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
  