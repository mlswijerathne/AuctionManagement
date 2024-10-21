import NavBar from './NavBar';
import Footer from './Footer';
import { Container,Box } from '@mui/material';

const Layout = ({ children, ...rest }) => {
    return (
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',  // Full height of the viewport
        }}
      >
        <NavBar {...rest} />
  
        <Container
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
          }}
        >
          {children}
        </Container>
  
        <Footer />
      </Box>
    );
}

export default Layout;