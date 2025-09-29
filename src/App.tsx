
import AboutPage from './pages/About';
import About from './pages/About';
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
      <AuthLayout />
      {/* <AboutPage /> */}
      <Footer />
    </>
  );
}

export default App
