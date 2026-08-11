import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiX } from 'react-icons/fi';
import QuantitySelector from '../ui/QuantitySelector';
import Button from '../ui/Button';
import { useCart, FREE_DELIVERY_THRESHOLD } from '../../context/CartContext';
import styles from './CartSidebar.module.css';

export default function CartSidebar() {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    updateQuantity,
    removeItem,
    closeCart,
    isCartOpen,
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
  }, [isCartOpen]);

  const progress = FREE_DELIVERY_THRESHOLD - subtotal;
  const needsMore = progress > 0;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className={styles.sidebar}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            aria-hidden={!isCartOpen}
          >
            <div className={styles.inner}>
              <div className={styles.header}>
                <h2 className={styles.title}>Your Cart</h2>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={closeCart}
                  aria-label="Close cart"
                >
                  <FiX />
                </button>
              </div>

              {items.length === 0 ? (
                <motion.div
                  className={styles.empty}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiShoppingBag className={styles.emptyIcon} />
                  <p className={styles.emptyText}>Your cart is empty.</p>
                  <Button variant="outline" size="md" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </motion.div>
              ) : (
                <>
                  <ul className={styles.list}>
                    {items.map(({ food, quantity }) => (
                      <li key={food.id} className={styles.item}>
                        <img
                          src={food.image}
                          alt={food.name}
                          className={styles.itemImage}
                          loading="lazy"
                        />
                        <div className={styles.itemInfo}>
                          <h3 className={styles.itemName}>{food.name}</h3>
                          <span className={styles.itemCategory}>{food.category}</span>
                          <span className={styles.itemPrice}>₹{food.price.toFixed(2)}</span>
                        </div>
                        <QuantitySelector
                          quantity={quantity}
                          onChange={(qty) => updateQuantity(food.id, qty)}
                        />
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeItem(food.id)}
                          aria-label={`Remove ${food.name}`}
                          title={`Remove ${food.name}`}
                        >
                          <span aria-hidden="true">&times;</span> Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.summary}>
                    <div className={styles.summaryRow}>
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    {needsMore && (
                      <p className={styles.freeHint}>
                        Add ₹{progress.toFixed(2)} more for free delivery
                      </p>
                    )}
                    <div className={styles.totalRow}>
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="primary"
                        size="lg"
                        className={styles.checkoutBtn}
                        onClick={() => {
                          closeCart();
                          navigate('/checkout');
                        }}
                      >
                        Proceed to Checkout ({itemCount})
                      </Button>
                    </motion.div>
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
