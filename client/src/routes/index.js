import React from 'react';
import Auth from '../components/Auth';
import SignUp from '../components/Auth/SigUp';
import SignIn from '../components/Auth/SignIn';
import { Route, Routes } from 'react-router-dom';
import Blogs from '../components/Blogs';
import PrivateRoutes from './privateRoutes';
const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Blogs />} />
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
