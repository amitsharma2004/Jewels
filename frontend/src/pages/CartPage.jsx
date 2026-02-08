import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, selectCartItems, selectCartTotal, selectCartItemCount } from '../store/slices/cartSlice';
import CartItem from '../components/CartItem';
import CartItemSkeleton from '../components/Skeletons/CartItemSkeleton';
import { formatPrice } from '../utils';
import styles from './CartPage.module.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartId = useSelector((state) => state.cart.cartId);
  const items = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    if (cartId) {
      dispatch(fetchCart(cartId));
    }
  }, [dispatch, cartId]);

  if (loading && items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Shopping Cart</h1>
          </div>
          <div className={styles.content}>
            <div className={styles.cartItems}>
              {[...Array(3)].map((_, index) => (
                <CartItemSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cartId || items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <div className={styles.emptyIcon} aria-hidden="true">🛒</div>
            <h2 className={styles.emptyTitle}>Your Cart is Empty</h2>
            <p className={styles.emptyMessage}>
              Looks like you haven't added any items to your cart yet
            </p>
            <Link to="/products" className={styles.shopButton}>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Shopping Cart</h1>
          <Link to="/products" className={styles.backLink}>
            ← Continue Shopping
          </Link>
        </div>

        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.cartItems} role="list" aria-label="Cart items">
            {items.filter(item => item.productId).map((item, index) => (
              <div key={item.productId?._id || `item-${index}`} role="listitem">
                <CartItem item={item} />
              </div>
            ))}
          </div>

          <aside className={styles.summary} aria-label="Order summary">
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Items ({itemCount})</span>
              <span className={styles.summaryValue}>{formatPrice(totalAmount)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Shipping</span>
              <span className={styles.summaryValue}>Calculated at checkout</span>
            </div>

            <div className={styles.summaryTotal}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>{formatPrice(totalAmount)}</span>
            </div>

            <button 
              className={styles.checkoutButton}
              disabled
              title="Checkout coming soon"
              aria-label="Proceed to checkout (coming soon)"
            >
              Proceed to Checkout
            </button>
            
            <p className={styles.checkoutNote}>
              Checkout functionality coming soon
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
