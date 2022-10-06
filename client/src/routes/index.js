import React from 'react';
import Auth from '../components/Auth';
import SignUp from '../components/Auth/SigUp';
import SignIn from '../components/Auth/SignIn';
import { Route, Routes } from 'react-router-dom';
import AllPosts from '../components/Blogs/AllPosts';
import PrivateRoutes from './privateRoutes';
import EditUser from '../components/Auth/EditUser';
import AddPost from "../components/Blogs/CreatePost";
const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<AllPosts />} />
        <Route path="edit-user/:id" element={<EditUser />} />
        <Route path="add-post/:id" element={<AddPost />} />
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
