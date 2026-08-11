import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <section className={styles.root} aria-label="Page not found">
      <div className={styles.card}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! The page you are looking for does not exist.</p>
        <Link to="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </div>
    </section>
  );
}
