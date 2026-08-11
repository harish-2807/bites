import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import styles from './BackToTop.module.css';

export default function BackToTop() {
  const [visible, setVisible] = useState();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className={styles.btn}
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          whileHover={{ scale: 1.1, y: -3, boxShadow: '0 18px 36px -6px rgba(255, 107, 53, 0.45)' }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowUp aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
