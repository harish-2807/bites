import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { motion } from 'framer-motion';
import styles from './CouponCard.module.css';

export default function CouponCard({ coupon, applied, onSelect, disabled, minOrderHint }) {
  const Icon = coupon.icon;
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(coupon.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const isDisabled = Boolean(disabled);

  return (
    <div
      className={[
        styles.card,
        styles[coupon.theme],
        applied ? styles.applied : '',
        isDisabled ? styles.disabled : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.banner} aria-hidden="true">
        <Icon className={styles.icon} />
      </div>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <h3 className={styles.title}>{coupon.title}</h3>
          <code className={styles.code}>{coupon.code}</code>
        </div>
        <p className={styles.description}>{coupon.description}</p>
        <p className={styles.validity}>{coupon.validity}</p>
        <p className={styles.terms}>{coupon.terms}</p>
        {minOrderHint ? <p className={styles.minHint}>{minOrderHint}</p> : null}
      </div>

      <div className={styles.actions}>
        <motion.button
          type="button"
          className={styles.copyBtn}
          onClick={copyCode}
          whileTap={{ scale: 0.92 }}
          aria-label="Copy coupon code"
        >
          {copied ? 'Copied!' : <FiCopy />}
        </motion.button>
        <motion.button
          type="button"
          className={`${styles.applyBtn} ${applied ? styles.appliedBtn : ''} ${isDisabled ? styles.disabledBtn : ''}`}
          onClick={() => !isDisabled && onSelect(coupon)}
          whileHover={isDisabled ? {} : { scale: 1.03 }}
          whileTap={isDisabled ? {} : { scale: 0.97 }}
          disabled={isDisabled}
        >
          {applied ? 'Applied' : isDisabled ? 'Min not met' : coupon.buttonText}
        </motion.button>
      </div>
    </div>
  );
}
