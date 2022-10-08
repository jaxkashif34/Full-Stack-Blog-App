import React from 'react';
import Auth from '../components/Auth';
import SignUp from '../components/Auth/SigUp';
import SignIn from '../components/Auth/SignIn';
import { Route, Routes } from 'react-router-dom';
import AllPosts from '../components/Posts/AllPosts';
import PrivateRoutes from './privateRoutes';
import EditUser from '../components/Auth/EditUser';
import AddPost from '../components/Posts/CreateUpdatePost';
import ViewPost from '../components/Posts/ViewPost';
const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<AllPosts />} />
        <Route path="edit-user/:id" element={<EditUser />} />
        <Route path="add-post" element={<AddPost />} />
        <Route path="edit-post/:id" element={<AddPost />} />
        <Route path="view-post/:id" element={<ViewPost />} />
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
