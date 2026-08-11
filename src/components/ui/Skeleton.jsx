import styles from './Skeleton.module.css';

export default function Skeleton({ className = '', style, text = false }) {
  return (
    <div
      className={[styles.skeleton, text ? styles.text : '', className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden="true"
    />
  );
}
