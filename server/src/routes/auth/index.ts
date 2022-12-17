import express, { Router } from 'express';
const router = express.Router();
import { signUp } from '../../controller/auth/signUp';
import { signIn } from '../../controller/auth/signIn';
import { editUser } from '../../controller/auth/Edit';
import { deleteUser } from '../../controller/auth/deleteUser';
import { getSingleUser } from '../../controller/auth/getSingleUser';
import { allUsers } from '../../controller/auth/alluser';
import { logoutUser } from '../../controller/auth/logout';
// SIGN-UP USER

router.use(express.json());
router.post('/sign-up', signUp);
// SIGN-IN USER
router.post('/sign-in', signIn);

// GET SINGLE USER
router.get('/get-user/:id', getSingleUser);

// GET ALL USERS
router.get('/all-users', allUsers);

// LOGOUT USER
router.post('/logout/:id', logoutUser);

// Delete a User
router.delete('/delete-user/:id', deleteUser);

// Edit User
router.put('/edit-user/:id', editUser);

export default router;
