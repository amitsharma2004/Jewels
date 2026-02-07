import { formatPrice, capitalize } from '../utils';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onAddToCart }) => {
  const { _id, name, price, category, images, inStock, stock } = product;
  const imageUrl = images?.[0] || 'https://via.placeholder.com/400x400?text=Jewelry';

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart && inStock) {
      onAddToCart(product);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={imageUrl} 
          alt={name}
          className={styles.image}
          loading="lazy"
        />
        <span className={styles.categoryBadge}>
          {capitalize(category)}
        </span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{formatPrice(price)}</p>
        
        {stock <= 5 && stock > 0 && (
          <span className={styles.stockBadge}>
            Only {stock} left
          </span>
        )}
        
        {!inStock && (
          <span className={`${styles.stockBadge} ${styles.outOfStock}`}>
            Out of Stock
          </span>
        )}
        
        <button 
          className={styles.addButton}
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
