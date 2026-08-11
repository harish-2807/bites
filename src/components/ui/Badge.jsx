import styles from './Badge.module.css';

export default function Badge({ count, className = '' }) {
  if (!count) return null;

  return (
    <span className={[styles.badge, className].filter(Boolean).join(' ')} aria-label={`You have ${count} items in your cart`}>
      {count > 99 ? '99+' : count}
    </span>
  );
}
