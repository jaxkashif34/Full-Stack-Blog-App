// const editPost = async (req, res) => {
//     const { title, content, tags, favoritedBy, isLiked } = req.body;
//     const isAlreadyLiked = isLiked && JSON.parse(isLiked);
//     const file = req.file;
//     const postId = req.params.id;
//     try {
//       let imgData;
//       if (file != null) {
//         const result = await uploadToCloudinary(file);
//         const { width, height, asset_id, created_at, bytes, secure_url, original_filename } = result;
//         imgData = {
//           width,
//           height,
//           asset_id,
//           created_at,
//           bytes,
//           secure_url,
//           original_filename,
//         };
//       }
  
//       const editedPost = await prisma.post.update({
//         where: {
//           id: postId,
//         },
//         ...((title != null || content != null || tags != null || favoritedBy != null || file != null) && {
//           data: {
//             ...(title != null && {
//               title,
//             }),
//             ...(content != null && {
//               content,
//             }),
//             ...(tags != null && {
//               tags: {
//                 push: tags,
//               },
//             }),
//             ...(favoritedBy != null && {
//               favoriteBy: {
//                 ...(isAlreadyLiked
//                   ? {
//                       connect: {
//                         id: favoritedBy,
//                       },
//                     }
//                   : {
//                       disconnect: {
//                         id: favoritedBy,
//                       },
//                     }),
//               },
//             }),
//             ...(file != null && {
//               bg_image: {
//                 update: {
//                   ...imgData,
//                 },
//               },
//             }),
//           },
//         }),
//         include: {
//           favoriteBy: {
//             select: {
//               name: true,
//               id: true,
//             },
//           },
//           bg_image: {
//             select: {
//               secure_url: true,
//               original_filename: true,
//             },
//           },
//           auther: {
//             select: {
//               name: true,
//             },
//           },
//         },
//       });
//       res.json({ message: 'Post updated successfully', data: editedPost });
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ message: 'Error updating post', error: e });
//     }
//   };