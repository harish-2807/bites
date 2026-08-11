import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPackage, FiShoppingBag, FiMapPin } from 'react-icons/fi';
import { formatCurrency } from '../data/coupons';
import styles from './OrderConfirmation.module.css';

const STEPS = [
  { label: 'Order Confirmed', icon: FiCheckCircle },
  { label: 'Preparing', icon: FiPackage },
  { label: 'Out for Delivery', icon: FiShoppingBag },
  { label: 'Delivered', icon: FiMapPin },
];

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state ?? {};
  const { orderId = 'BBXXXXXX', total = 0, itemCount = 0 } = state;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className={`section container ${styles.page}`}>
      <div className={styles.card}>
        <motion.div
          className={styles.thankyou}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <FiCheckCircle className={styles.confirmIcon} aria-hidden="true" />
        </motion.div>

        <h1 className={styles.title}>Thank you for your order!</h1>
        <p className={styles.subtitle}>
          Your order <code className={styles.orderId}>#{orderId}</code> has been placed successfully.
        </p>

        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span>Items</span>
            <strong>{itemCount}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>Total paid</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </div>

        <ul className={styles.stepper}>
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === 0;
            const isComplete = index < 1;
            return (
              <li key={step.label} className={styles.step}>
                <motion.span
                  className={[
                    styles.stepCircle,
                    isActive ? styles.stepActive : '',
                    isComplete ? styles.stepDone : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                  aria-hidden="true"
                >
                  <Icon className={styles.stepIcon} />
                </motion.span>
                <span className={[styles.stepLabel, isActive ? styles.stepLabelActive : ''].filter(Boolean).join(' ')}>
                  {step.label}
                </span>
              </li>
            );
          })}
        </ul>

        <p className={styles.trackingNote}>
          You can track your order status in real time on the Track Order page.
        </p>

        <div className={styles.actions}>
          <motion.button
            type="button"
            className={styles.trackBtn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/track-order')}
          >
            Track Order
          </motion.button>
          <motion.button
            type="button"
            className={styles.homeBtn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    </section>
  );
}
