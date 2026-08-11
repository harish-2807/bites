import { FiMinus, FiPlus } from 'react-icons/fi';
import styles from './QuantitySelector.module.css';

export default function QuantitySelector({ quantity = 1, min = 1, max = 99, onChange }) {
  const decrement = () => onChange(Math.max(min, quantity - 1));
  const increment = () => onChange(Math.min(max, quantity + 1));

  return (
    <div className={styles.wrapper} aria-label="Quantity">
      <button
        type="button"
        className={styles.button}
        onClick={decrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <FiMinus />
      </button>
      <span className={styles.value} aria-label="Quantity value">
        {quantity}
      </span>
      <button
        type="button"
        className={styles.button}
        onClick={increment}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <FiPlus />
      </button>
    </div>
  );
}
