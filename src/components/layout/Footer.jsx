import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FooterLink from '../ui/FooterLink';
import SocialIcons from '../ui/SocialIcons';
import Button from '../ui/Button';
import ScrollAnimate from '../ui/ScrollAnimate';
import styles from './Footer.module.css';

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Blog', href: '#blog' },
      { label: 'Press', href: '#press' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Restaurants', to: '/restaurants' },
      { label: 'Track Order', to: '/track-order' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '1-800-BALANCED', href: 'tel:+18002252623' },
      { label: 'hello@balancedbites.com', href: 'mailto:hello@balancedbites.com' },
      { label: '123 Food Street, New York, NY', href: '#address' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ScrollAnimate>
          <BrandSection />
        </ScrollAnimate>

        {columns.map((col) => (
          <ScrollAnimate key={col.title}>
            <FooterColumn title={col.title} links={col.links} />
          </ScrollAnimate>
        ))}

        <ScrollAnimate>
          <NewsletterSection />
        </ScrollAnimate>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} Balanced Bites. All rights reserved.
      </div>
    </footer>
  );
}

function BrandSection() {
  return (
    <div className={styles.brand}>
      <div className={styles.logo}>
        <span className={styles.logoSymbol} aria-hidden="true">
          🍕
        </span>
        <span className={styles.logoText}>Balanced Bites</span>
      </div>
      <p className={styles.tagline}>Delicious food, delivered to your door.</p>
      <SocialIcons />
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className={styles.column}>
      <h3 className={styles.colTitle}>{title}</h3>
      <ul className={styles.colList}>
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 2200);
    setEmail('');
  };

  return (
    <div className={styles.newsletter}>
      <h3 className={styles.colTitle}>Stay in the loop</h3>
      <p className={styles.newsText}>Subscribe for updates, offers & tasty recipes.</p>
      <form onSubmit={handleSubmit} className={styles.newsForm}>
        <label htmlFor="newsletter-email" className={styles.newsLabel}>
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.newsInput}
          aria-label="Email address"
          required
        />
        <Button variant="primary" size="sm" type="submit" className={styles.newsBtn} aria-label="Subscribe to newsletter">
          Subscribe
        </Button>
      </form>
      <AnimatePresence>
        {subscribed && (
          <motion.p
            className={styles.newsFeedback}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            Thanks for subscribing! 🎉
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
