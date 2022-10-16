/**
 * It's a function that renders the Nav component, the SnackBar component, the Routes component, the
 * BottomBar component, and the Modal component
 * @returns The return value of the function is the value of the last expression in the function body.
 */
import Nav from './components/Nav';
import BottomBar from './components/BottomBar';
import { getPosts } from './store/Posts';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Routes from './routes';
import SnackBar from './components/Snackbar';
import Modal from './components/model';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Nav />
      <SnackBar />
      <Routes />
      <BottomBar />
      <Modal />
    </>
  );
}

export default App;
