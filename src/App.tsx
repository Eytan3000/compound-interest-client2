import React, { useEffect, useState } from 'react'
// import './App.css'
import { useSelector } from 'react-redux';
import { Box, Theme, Typography } from '@mui/joy';
import Modal from '@mui/material/Modal';
import ResponsiveAppBar from './components/ui/ResponsiveAppBar';
import SavedResultCard from './components/form/SavedResultCard';
import FormArea from './components/form/FormArea';
import SumsCard from './components/ui/SumsCard';
import News from './news/News';
import HpArticle from './news/HpArticle';
import Footer from './components/ui/Footer';


//-------------------------------------------------
interface RootState {
  app: {
    submit: boolean; 
  };
}
//-------------------------------------------------

function App() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dataPosted, setDataPosted] = useState<boolean>(false); // postData function re-renders savedResultCard after saving details to db

  const reduxSubmit = useSelector((state: RootState) => state.app.submit);

  //get the size of screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1200); // Adjust the breakpoint as needed. xs, extra-small: 0px. sm, small: 600px. md, medium: 900px. lg, large: 1200px.
    };
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const titleStyles = (theme: Theme) => ({
    [theme.breakpoints.up('xs')]: {
      fontSize: '24px', // Adjust the font size for small to medium screens
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '24px', // Font size for medium to large screens
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '36px', // Font size for large screens
    },
  });
  const titleBoxStyles = (theme: Theme) => ({
    [theme.breakpoints.up('xs')]: {
      margin: 3,
    },
    [theme.breakpoints.up('lg')]: {
      margin: 10,
    },
  });

  const handleOpen = () => setMenuOpen(true);
  const handleClose = () => setMenuOpen(false);

  return (
    <>
      <ResponsiveAppBar isMobile={isMobile} handleOpen={handleOpen} />

      <Modal
        open={menuOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        {/* <Box display={'flex'} justifyContent={'center'} mt={4}>
          <SavedResultCard dataPosted={dataPosted} />
        </Box> */}
        <SavedResultCard isMobile={isMobile} dataPosted={dataPosted} />
      </Modal>

      <Box
        display={'flex'}
        justifyContent={'center'}
        textAlign={'center'}
        sx={titleBoxStyles}>
        <Typography level="h1" sx={titleStyles}>
          Compound Interest Calculator
        </Typography>
      </Box>

      <FormArea
        isMobile={isMobile}
        setDataPosted={setDataPosted}
        dataPosted={dataPosted}
      />

      {reduxSubmit && (
        <SumsCard />
      )}
      <News />
      <HpArticle />
      <Footer isMobile={isMobile} />
    </>
  );
}

export default App;
