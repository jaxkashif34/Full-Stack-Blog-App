/**
 * If the user is logged in, render the route, otherwise redirect to the sign in page
 * @returns The currentUser is being returned from the auth reducer.
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
const PrivateRoutes = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return currentUser ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default PrivateRoutes;
