import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../store/slices/cartSlice';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemCount = useSelector(selectCartItemCount);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        <Link to="/" className={styles.brand} onClick={closeMobileMenu}>
          <span className={styles.brandIcon} aria-hidden="true">💎</span>
          <span>Naksh Jewels</span>
        </Link>
        
        <button 
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.open : ''}`}></span>
        </button>
        
        <div className={`${styles.nav} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/" className={styles.navLink} onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className={styles.navLink} onClick={closeMobileMenu}>
                Products
              </Link>
            </li>
          </ul>
          
          <Link 
            to="/cart" 
            className={styles.cartButton}
            onClick={closeMobileMenu}
            aria-label={`Shopping cart with ${cartItemCount} items`}
          >
            <span className={styles.cartIcon} aria-hidden="true">🛒</span>
            <span className={styles.cartText}>Cart</span>
            {cartItemCount > 0 && (
              <span className={styles.cartBadge} aria-label={`${cartItemCount} items in cart`}>
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
