import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './FooterLink.module.css';

const MotionNavLink = motion.create(NavLink);
const MotionAnchor = motion.create('a');

export default function FooterLink({ label, to, href, isExternal }) {
  if (to) {
    return (
      <MotionNavLink
        to={to}
        className={styles.link}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.96 }}
      >
        {label}
      </MotionNavLink>
    );
  }

  return (
    <MotionAnchor
      href={href || '#'}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={styles.link}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.96 }}
    >
      {label}
    </MotionAnchor>
  );
}
