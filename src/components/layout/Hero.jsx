import { FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeInUp,
  slideInFromRight,
} from '../../styles/animations';
import Button from '../ui/Button';
import { HERO_IMAGE } from '../../constants/images';
import styles from './Hero.module.css';

export default function Hero({ onOrderNow }) {
  return (
    <section className={styles.hero} aria-label="Hero banner">
      <div className={styles.container}>
        <motion.div
          className={styles.textContent}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={fadeInUp} className={styles.title}>
            Delicious Food Delivered To Your Door
          </motion.h1>
          <motion.p variants={fadeInUp} className={styles.subtitle}>
            Fresh ingredients, mouth-watering flavors, and lightning-fast delivery
            — straight to your home. Start your meal journey today.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button variant="primary" size="lg" icon={FiShoppingCart} onClick={onOrderNow}>
              Order Now
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          variants={slideInFromRight}
          initial="hidden"
          animate="visible"
        >
          <img src={HERO_IMAGE} alt="" aria-hidden="true" loading="eager" />
        </motion.div>
      </div>
    </section>
  );
}
