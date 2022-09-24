import Nav from './components/Nav';
import Blogs from './components/Blogs';
import BottomBar from './components/BottomBar';
import { getPosts } from './store/UI-Features';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <>
      <Nav />
      <Blogs />
      <BottomBar />
    </>
  );
}

export default App;
