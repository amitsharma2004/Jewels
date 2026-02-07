import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon}>💎</span>
          Naksh Jewels
        </Link>
        
        <div className={styles.nav}>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/" className={styles.navLink}>Home</Link>
            </li>
            <li>
              <Link to="/products" className={styles.navLink}>Products</Link>
            </li>
          </ul>
          
          <Link to="/cart" className={styles.cartButton}>
            <span className={styles.cartIcon}>🛒</span>
            <span className={styles.cartText}>Cart</span>
            {cartItemCount > 0 && (
              <span className={styles.cartBadge}>{cartItemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
