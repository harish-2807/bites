import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer } from '../styles/animations';
import { useCart } from '../context/CartContext';
import { COUPONS, applyCoupon, formatCurrency, GST_RATE, meetsMinimum } from '../data/coupons';
import CouponCard from '../components/ui/CouponCard';
import styles from './Checkout.module.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, deliveryFee, clearCart } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toast, setToast] = useState({ message: '', show: false });

  useEffect(() => {
    if (!toast.show) return undefined;
    const t = setTimeout(() => setToast((s) => ({ ...s, show: false })), 2400);
    return () => clearTimeout(t);
  }, [toast.show]);

  const discount = useMemo(
    () => applyCoupon(subtotal, deliveryFee, items, appliedCoupon),
    [subtotal, deliveryFee, items, appliedCoupon]
  );

  const taxBase = Math.max(0, subtotal - discount.discount);
  const tax = subtotal > 0 ? (taxBase * GST_RATE) / 100 : 0;
  const roundedTax = Math.round(tax * 100) / 100;
  const finalTotal = Math.max(0, Math.round((subtotal + deliveryFee - discount.discount + roundedTax) * 100) / 100);

  const handleSelect = (coupon) => {
    if (appliedCoupon && appliedCoupon.id === coupon.id) {
      setAppliedCoupon(null);
      setToast({ message: 'Coupon removed', show: true });
    } else {
      setAppliedCoupon(coupon);
      setToast({ message: `Coupon ${coupon.code} applied`, show: true });
    }
  };

  const handlePlaceOrder = () => {
    if (itemCount === 0) return;
    clearCart();
    const orderId = `BB${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    navigate('/order-confirmed', {
      state: { orderId, total: finalTotal, itemCount },
    });
  };

  return (
    <section className={`section container ${styles.page}`}>
      <h1 className={styles.heading}>Checkout</h1>

      <div className={styles.layout}>
        <motion.div
          className={styles.coupons}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.couponsHeader}>
            <h2 className={styles.sectionTitle}>Available Coupons &amp; Offers</h2>
            <p className={styles.sectionHint}>
              {itemCount === 0
                ? 'Add items to the cart to use these offers.'
                : 'Tap Apply to use a coupon. Only one coupon can be active.'}
            </p>
          </div>

          {itemCount === 0 ? (
            <p className={styles.emptyCoupons}>Your cart is empty. Browse and add items first.</p>
          ) : (
            <div className={styles.couponGrid}>
              {COUPONS.map((coupon) => {
                const eligible = meetsMinimum(subtotal, coupon);
                const applied = appliedCoupon?.id === coupon.id;
                const minOrderHint =
                  !eligible && subtotal > 0
                    ? `Min order ₹${coupon.minOrder}`
                    : '';
                return (
                  <CouponCard
                    key={coupon.id}
                    coupon={coupon}
                    applied={applied}
                    onSelect={handleSelect}
                    disabled={!eligible}
                    minOrderHint={minOrderHint}
                  />
                );
            })}
            </div>
          )}
        </motion.div>

        <aside className={styles.summary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <ul className={styles.summaryRows}>
              <li className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </li>
              <li className={styles.summaryRow}>
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}</span>
              </li>
              <li className={`${styles.summaryRow} ${styles.discountRow}`}>
                <span>Discount {appliedCoupon ? `(${appliedCoupon.code})` : ''}</span>
                <span>{discount.discount > 0 ? `-${formatCurrency(discount.discount)}` : '—'}</span>
              </li>
              <li className={styles.summaryRow}>
                <span>GST (incl. {GST_RATE}%)</span>
                <span>{formatCurrency(roundedTax)}</span>
              </li>
              <li className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>{formatCurrency(finalTotal)}</span>
              </li>
              {appliedCoupon && (
                <li className={styles.appliedCouponRow}>
                  <span>Applied Coupon</span>
                  <code className={styles.appliedCode}>{appliedCoupon.code}</code>
                </li>
              )}
            </ul>
          </div>

          <motion.div whileHover={{ scale: itemCount === 0 ? 1 : 1.02 }} whileTap={{ scale: itemCount === 0 ? 1 : 0.98 }}>
            <button
              type="button"
              className={styles.placeOrderBtn}
              onClick={handlePlaceOrder}
              disabled={itemCount === 0}
            >
              {itemCount === 0 ? 'Add items to place an order' : `Place Order → ${formatCurrency(finalTotal)}`}
            </button>
          </motion.div>
        </aside>
      </div>

      <AnimatePresence>
        {toast.show && (
          <motion.div
            className={styles.toast}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
