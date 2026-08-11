import { motion } from 'framer-motion';
import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    Icon ? styles.withIcon : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.button
      whileHover={{ scale: variant !== 'ghost' && variant !== 'outline' ? 1.04 : 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={classes}
      onClick={onClick}
      type="button"
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className={styles.icon} aria-hidden="true" />}
      <span className={styles.label}>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className={styles.icon} aria-hidden="true" />}
    </motion.button>
  );
}
