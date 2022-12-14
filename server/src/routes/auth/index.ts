import express from 'express';
const router = express.Router();
import { signUp } from '../../controller/auth/signUp';
import { signIn } from '../../controller/auth/signIn';
// SIGN-UP USER

router.use(express.json());
router.post('/sign-up', signUp);
// SIGN-IN USER
router.post('/sign-in', signIn);

// Delete a User
// router.delete('/delete-user/:id', deleteUser);

// // Edit User
// router.put('/edit-user/:id', upload.single('profile_pic'), editUser);

export default router;
