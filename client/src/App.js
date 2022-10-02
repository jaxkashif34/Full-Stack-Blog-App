import Nav from './components/Nav';
import BottomBar from './components/BottomBar';
import { getPosts } from './store/UI-Features';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Routes from './routes';
import SnackBar from './components/Snackbar';
function App() {
  useEffect(() => {
    // dispatch(getPosts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Nav />
      <SnackBar />
      <Routes />
      <BottomBar />
    </>
  );
}

export default App;
