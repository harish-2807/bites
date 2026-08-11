import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './SocialIcons.module.css';

const socialLinks = [
  { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com' },
  { name: 'X (Twitter)', icon: FaTwitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
  { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com' },
];

export default function SocialIcons() {
  return (
    <ul className={styles.list} role="list">
      {socialLinks.map(({ name, icon: Icon, href }) => (
        <li key={name}>
          <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
            aria-label={name}
            whileHover={{ scale: 1.12, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon className={styles.icon} aria-hidden="true" />
          </motion.a>
        </li>
      ))}
    </ul>
  );
}
