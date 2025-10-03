
import Box from '@mui/material/Box';
import AboutPage from './pages/About';
import About from './pages/About';
import CartPage from './pages/Cart';
import CheckOut from './pages/CheckOut';
import Contact from './pages/Contact';
import Homepage from './pages/Home-page';
import Footer from './shared/components/Footer';
import Header from './shared/components/Header';
import PromoBar from './shared/components/Promo-bar';
import AuthLayout from './shared/layouts/Auth-layout';
import ProductDetailsPage from './pages/Product-details-page';
import WishlistPage from './pages/Wish-list';
import ProductPage from './pages/Products-page';


function App() {


  return (
    <>
      <PromoBar />
      <Header />

      {/* Spacer to avoid content hiding under fixed bars */}
      <Box sx={{ height: { xs: 50 + 64, sm: 40 + 64 } }} />

      <ProductPage/>
      <Footer />
    </>
  );
}

export default App
