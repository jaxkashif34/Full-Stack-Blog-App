import { Response } from 'express';
import { upload } from '../../middleware';
import { errors } from '../../utils/errors';
import { GetUserAuthInfoRequest } from '../../utils/request';
import { signInValidation } from '../../utils/validation/signIn';
export const signIn = [
  // upload.single('ProfilePic'),
  ...signInValidation,
  async (req: GetUserAuthInfoRequest, res: Response) => {
    // const { email, password } = req.body;
    console.log(req.body);
    if (errors(req).length > 0) return res.status(400).json({ errors: errors(req) });
  },
];
// export const loginSignInUser = async (req:Request, res:Response) => {
//     const { email, password } = req.body;

//     try {
//       if (!email && !password) {
//         res.json({ message: 'Please enter email and password' });
//         return;
//       } else if (!email || !password) {
//         res.json({ message: 'Both email and password are required' });
//         return;
//       }

//       const user = await prisma.user.findUnique({
//         where: {
//           email: email,
//         },
//         select: {
//           name: true,
//           id: true,
//           password: true,
//           profile_pic: {
//             select: {
//               id: true,
//               secure_url: true,
//               original_filename: true,
//             },
//           },
//         },
//       });

//       if (user) {
//         const isMatch = await comparePassword(password, user.password);
//         if (isMatch) {
//           res.json({ message: `Welcome Back ${user.name}`, data: user });
//         } else {
//           res.json({ message: 'Incorrect password' });
//         }
//       } else {
//         res.json({ message: 'User not found' });
//       }
//     } catch (e) {
//       console.log('Errot in login', e);
//       res.json({ message: JSON.stringify(e) });
//     }
//   };
