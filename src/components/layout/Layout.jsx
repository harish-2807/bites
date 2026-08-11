import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import CartSidebar from './CartSidebar';
import Footer from './Footer';
import BackToTop from '../ui/BackToTop';
import ScrollToTop from '../utils/ScrollToTop';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <BackToTop />
      <Footer />
      <CartSidebar />
    </>
  );
}
