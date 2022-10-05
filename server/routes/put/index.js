const { generateHashPassword } = require('../../utils');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { uploadToCloudinary } = require('../../config');
const editPost = async (req, res) => {
  const { updatedPost } = req.body;
  const postId = req.params.id;
  const title = updatedPost.title;
  const content = updatedPost.content;
  const tags = updatedPost.tags;
  try {
    const editedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
        tags: {
          push: tags,
        },
      },
    });
    res.send(editedPost);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
};
const editUser = async (req, res) => {
  const file = req.file;
  const { name, email, date_of_birth, role, password, emailUpdates } = req.body;
  const userId = req.params.id;

  const editedUserData = {
    name,
    email,
    role,
    date_of_birth: new Date(date_of_birth),
    password: await generateHashPassword(password),
    emailUpdates: JSON.parse(emailUpdates),
  };

  const updateInDatabase = (imgData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            ...editedUserData,
            ...(imgData != null && {
              profile_pic: {
                update: {
                  ...imgData,
                },
              },
            }),
          },
          ...(imgData != null && {
            include: {
              profile_pic: true,
            },
          }),
        });

        resolve(updatedUser);
      } catch (err) {
        reject(err);
      }
    });
  };
  let imgData;
  if (file != null) {
    const result = await uploadToCloudinary(file.path);
    const { width, height, asset_id, created_at, bytes, secure_url, original_filename } = result;
    imgData = {
      width,
      height,
      asset_id,
      created_at,
      bytes,
      secure_url,
      original_filename,
    };
  }

  updateInDatabase(imgData)
    .then((result) => {
      res.json({ message: 'User updated successfully', data: result });
    })
    .catch((err) => {
      res.json({ message: 'Error updating user', error: err });
    });
};
module.exports = { editPost, editUser };
