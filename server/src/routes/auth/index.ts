import express from 'express';
const router = express.Router();
import { signUp } from '../../controller/auth/signUp';
import { signIn } from '../../controller/auth/signIn';
import { editUser } from '../../controller/auth/Edit';
// SIGN-UP USER

router.use(express.json());
router.post('/sign-up', signUp);
// SIGN-IN USER
router.post('/sign-in', signIn);

// Delete a User
// router.delete('/delete-user/:id', deleteUser);

// Edit User
router.put('/edit-user/:id', editUser);

export default router;
