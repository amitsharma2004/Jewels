import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { formatPrice, capitalize } from '../utils';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { _id, name, price, category, images, inStock, stock } = product;
  const imageUrl = images?.[0] || 'https://via.placeholder.com/400x400?text=Jewelry';
  
  const [showSuccess, setShowSuccess] = useState(false);
  const addingItem = useSelector((state) => state.cart.addingItem);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!inStock) return;

    try {
      await dispatch(addToCart({ product, quantity: 1 })).unwrap();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={`${name} - ${capitalize(category)}`}
          className={styles.image}
          loading="lazy"
          width="400"
          height="400"
        />
        <span className={styles.categoryBadge} aria-label={`Category: ${category}`}>
          {capitalize(category)}
        </span>
        {showSuccess && (
          <div className={styles.successBadge} role="status" aria-live="polite">
            ✓ Added!
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price} aria-label={`Price: ${formatPrice(price)}`}>
          {formatPrice(price)}
        </p>
        
        {stock <= 5 && stock > 0 && (
          <span className={styles.stockBadge} role="status">
            Only {stock} left
          </span>
        )}
        
        {!inStock && (
          <span className={`${styles.stockBadge} ${styles.outOfStock}`} role="status">
            Out of Stock
          </span>
        )}
        
        <button 
          className={styles.addButton}
          onClick={handleAddToCart}
          disabled={!inStock || addingItem}
          aria-label={`Add ${name} to cart`}
        >
          {addingItem ? 'Adding...' : inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
