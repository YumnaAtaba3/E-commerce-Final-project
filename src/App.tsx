
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
      {/* <NotFoundPage /> */}
      {/* <AuthLayout /> */}
      {/* <AboutPage /> */}
      {/* <Contact/> */}
      {/* <CartPage /> */}
      {/* <CheckOut/> */}
      <Homepage/>
      <Footer />
    </>
  );
}

export default App
