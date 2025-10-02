
import Box from '@mui/material/Box';
import AboutPage from './pages/About';
import About from './pages/About';
import CartPage from './pages/Cart';
import CheckOut from './pages/CheckOut';
import Contact from './pages/Contact';
import Homepage from './pages/HomePage';
import Footer from './shared/components/Footer';
import Header from './shared/components/Header';
import PromoBar from './shared/components/Promo-bar';
import AuthLayout from './shared/layouts/Auth-layout';


function App() {


  return (
    <>
      <PromoBar />
      <Header />

      {/* Spacer to avoid content hiding under fixed bars */}
      <Box sx={{ height: { xs: 50 + 64, sm: 40 + 64 } }} />

      <Homepage />
      <Footer />
    </>

  );
}

export default App
