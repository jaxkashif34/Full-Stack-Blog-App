const { generateHashPassword, comparePassword } = require('../../utils');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { uploadToCloudinary } = require('../../config');
// create a post
const createPost = async (req, res) => {
  const file = req.file;
  const { title, content, autherId, tags } = req.body;
  const tagsArr = JSON.parse(tags);

  uploadToCloudinary(file.path)
    .then(async (result) => {
      const imgObj = {
        width: result.width,
        height: result.height,
        asset_id: result.asset_id,
        created_at: result.created_at,
        bytes: result.bytes,
        secure_url: result.secure_url,
        original_filename: result.original_filename,
      };

      const createdPost = await prisma.post.create({
        data: {
          title,
          content,
          autherId,
          tags: tagsArr,
          bg_image: {
            create: {
              ...imgObj,
            },
          },
        },
        include: {
          bg_image: true,
        },
      });

      res.send({ message: 'Post created successfully', data: createdPost });
    })
    .catch((err) => {
      res.status(400).send({ message: 'Error in saving data into database', error: err });
    });
};

const createUser = async (req, res) => {
  const file = req.file;
  const { name, email, password, role, date_of_birth, emailUpdates } = req.body;
  const userDatails = {
    name,
    email,
    role,
    emailUpdates: JSON.parse(emailUpdates),
    date_of_birth: new Date(date_of_birth),
    password: await generateHashPassword(password),
  };

  const saveInDabase = async (imgData) => {
    return await new Promise(async (resolve, reject) => {
      try {
        const createdUser = await prisma.user.create({
          data: {
            ...userDatails,
            profile_pic: {
              create: {
                ...imgData,
              },
            },
          },
          include: {
            profile_pic: {
              select: {
                id: true,
                secure_url: true,
                asset_id: true,
                user_id: true,
              },
            },
          },
        });
        resolve(createdUser);
      } catch (e) {
        reject(e);
      }
    });
  };

  uploadToCloudinary(file.path).then(async (result) => {
    const { width, height, asset_id, created_at, bytes, secure_url, original_filename } = result;
    const imgData = {
      width,
      height,
      asset_id,
      created_at,
      bytes,
      secure_url,
      original_filename,
    };

    saveInDabase(imgData)
      .then((result) => {
        res.send({ message: `Welcome ${name}`, data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: 'Error in saving user', error: err });
      });
  });
};

const loginSignInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email && !password) {
      res.json({ message: 'Please enter email and password' });
      return;
    } else if (!email || !password) {
      res.json({ message: 'Both email and password are required' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        profile_pic: {
          select: {
            id: true,
            secure_url: true,
            asset_id: true,
            user_id: true,
          },
        },
      },
    });

    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (isMatch) {
        res.json({ message: `Welcome Back ${user.name}`, data: user });
      } else {
        res.json({ message: 'Incorrect password' });
      }
    } else {
      res.json({ message: 'User not found' });
    }
  } catch (e) {
    res.json({ message: JSON.stringify(e) });
  }
};

module.exports = { createPost, createUser, loginSignInUser };
