import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../../constants/navLinks';
import { useFoodFilter } from '../../context/FoodFilterContext';
import { useCart } from '../../context/CartContext';
import Badge from '../ui/Badge';
import SearchBar from '../ui/SearchBar';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState();
  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  const { searchTerm, setSearchTerm } = useFoodFilter();
  const { itemCount, toggleCart, isCartOpen } = useCart();

  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.linkActive : ''}`;

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.container}>
          <div className={styles.start}>
            <button
              type="button"
              className={styles.hamburger}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90, y: -4 }}
                    animate={{ opacity: 1, rotate: 0, y: 0 }}
                    exit={{ opacity: 0, rotate: 90, y: 4 }}
                    transition={{ duration: 0.18 }}
                  >
                    <FiX />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, y: 4 }}
                    animate={{ opacity: 1, rotate: 0, y: 0 }}
                    exit={{ opacity: 0, rotate: -90, y: -4 }}
                    transition={{ duration: 0.18 }}
                  >
                    <FiMenu />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link to="/" className={styles.logo} onClick={closeMenu}>
              <span className={styles.logoSymbol} aria-hidden="true">
                🍕
              </span>
              <span className={styles.logoText}>Balanced Bites</span>
            </Link>
          </div>

          <div className={styles.center}>
            <div className={styles.desktopNav}>
              {navLinks.map(({ name, to, icon: Icon }) => (
                <NavLink key={name} to={to} className={linkClass} end>
                  <Icon className={styles.linkIcon} aria-hidden="true" />
                  <span>{name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className={styles.end}>
            <div className={styles.desktopActions}>
              <SearchBar
                id="header-search"
                className={styles.search}
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search food, restaurants..."
              />
              <button type="button" className={styles.iconBtn} aria-label="Your profile" title="Profile">
                <FiUser className={styles.actionIcon} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label={`Cart with ${itemCount} items`}
                aria-expanded={isCartOpen}
                title="View cart"
                onClick={toggleCart}
              >
                <FiShoppingCart className={styles.actionIcon} aria-hidden="true" />
                <Badge count={itemCount} className={styles.cartBadge} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            id="mobile-menu"
            className={styles.mobileMenu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className={styles.mobileMenuInner}>
              <div className={styles.mobileHeader}>
                <Link to="/" className={styles.mobileLogo} onClick={closeMenu}>
                  <span aria-hidden="true">🍕</span>
                  Balanced Bites
                </Link>
              </div>
              <nav className={styles.mobileNav} aria-label="Mobile navigation">
                {navLinks.map(({ name, to, icon: Icon }) => (
                  <NavLink
                    key={name}
                    to={to}
                    className={linkClass}
                    end
                    onClick={closeMenu}
                  >
                    <Icon className={styles.linkIcon} aria-hidden="true" />
                    <span>{name}</span>
                  </NavLink>
                ))}
              </nav>
              <div className={styles.mobileActions}>
                <SearchBar
                  id="mobile-search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                />
                <button type="button" className={styles.mobileActionBtn} aria-label="Your profile">
                  <FiUser className={styles.actionIcon} />
                  <span>Profile</span>
                </button>
                <button type="button" className={styles.mobileActionBtn} aria-label="Your cart">
                  <FiShoppingCart className={styles.actionIcon} />
                  <span>Cart</span>
                  <Badge count={itemCount} />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {menuOpen && (
        <motion.div
          className={styles.mobileBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMenu}
        />
      )}
    </header>
  );
}
