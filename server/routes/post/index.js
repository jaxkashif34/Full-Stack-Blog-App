const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { cloudinary } = require('../../config');
const prisma = new PrismaClient();
const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

// create a post
const createPost = async (req, res) => {
  const file = req.file;
  const { title, content, autherId, tags } = req.body;
  const tagsArr = JSON.parse(tags);
  const uploadToCloudinary = () => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, options, (err, result) => {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    });
  };

  uploadToCloudinary()
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
  const { name, email, password, role, date_of_birth } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userDatails = {
    name,
    email,
    role,
    date_of_birth: new Date(date_of_birth),
    password: hashedPassword,
  };

  const uploadToCloudinary = () => {
    return new Promise(async (resolve, reject) => {
      await cloudinary.uploader.upload(file.path, options, (err, result) => {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        }
      });
    });
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
            profile_pic: true,
          },
        });
        resolve(createdUser);
      } catch (e) {
        reject(e);
      }
    });
  };

  uploadToCloudinary().then(async (result) => {
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
        res.send({ message: 'User saved successfully', data: result });
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
      res.send('Please enter email and password');
      return;
    } else if (!email || !password) {
      res.send('Both email and password are required');
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.send(user);
      } else {
        res.send('Incorrect password');
      }
    } else {
      res.send('User not found');
    }
  } catch (e) {
    res.send(JSON.stringify(e));
  }
};

module.exports = { createPost, createUser, loginSignInUser };
