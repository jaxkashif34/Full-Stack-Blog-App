/* A function that is being exported from the file. */
const { generateHashPassword } = require('../../utils');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { uploadToCloudinary } = require('../../config');
const editPost = async (req, res) => {
  const { title, content, tags, favoritedBy, isLiked } = req.body;
  const isAlreadyLiked = isLiked && JSON.parse(isLiked);
  const file = req.file;
  const postId = req.params.id;
  try {
    let imgData;
    if (file != null) {
      const result = await uploadToCloudinary(file);
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

    const editedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      ...((title != null || content != null || tags != null || favoritedBy != null || file != null) && {
        data: {
          ...(title != null && {
            title,
          }),
          ...(content != null && {
            content,
          }),
          ...(tags != null && {
            tags: {
              push: tags,
            },
          }),
          ...(favoritedBy != null && {
            favoriteBy: {
              ...(isAlreadyLiked
                ? {
                    connect: {
                      id: favoritedBy,
                    },
                  }
                : {
                    disconnect: {
                      id: favoritedBy,
                    },
                  }),
            },
          }),
          ...(file != null && {
            bg_image: {
              update: {
                ...imgData,
              },
            },
          }),
        },
      }),
      include: {
        favoriteBy: {
          select: {
            name: true,
            id: true,
          },
        },
        bg_image: {
          select: {
            secure_url: true,
            original_filename: true,
          },
        },
        auther: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json({ message: 'Post updated successfully', data: editedPost });
  } catch (e) {
    res.status(400).json({ message: 'Error updating post', error: e });
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
          include: {
            profile_pic: true,
          },
        });

        resolve(updatedUser);
      } catch (err) {
        reject(err);
      }
    });
  };
  let imgData;
  if (file != null) {
    const result = await uploadToCloudinary(file);
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
