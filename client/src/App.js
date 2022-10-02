import Nav from './components/Nav';
import Blogs from './components/Blogs';
import BottomBar from './components/BottomBar';
import { getPosts } from './store/UI-Features';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import SignUp from './components/Auth/SigUp';
import SignIn from './components/Auth/SignIn';
import SnackBar from './components/Snackbar';
function App() {
  useEffect(() => {
    // dispatch(getPosts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Nav />
      <SnackBar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
      <BottomBar />
    </>
  );
}

export default App;
