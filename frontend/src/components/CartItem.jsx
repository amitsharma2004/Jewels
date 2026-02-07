import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/slices/cartSlice';
import { formatPrice } from '../utils';
import styles from './CartItem.module.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { productId, quantity, priceAtAdd } = item;
  const product = productId;
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const imageUrl = product?.images?.[0] || 'https://via.placeholder.com/150x150?text=Jewelry';
  const itemTotal = priceAtAdd * quantity;

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > product.stock) return;
    
    setIsUpdating(true);
    try {
      await dispatch(updateQuantity({ 
        productId: product._id, 
        quantity: newQuantity 
      })).unwrap();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      await dispatch(removeFromCart(product._id)).unwrap();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const confirmRemove = () => {
    setShowRemoveConfirm(true);
    setTimeout(() => setShowRemoveConfirm(false), 3000);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={product?.name} className={styles.image} />
      </div>
      
      <div className={styles.details}>
        <h3 className={styles.name}>{product?.name}</h3>
        <p className={styles.price}>{formatPrice(priceAtAdd)} each</p>
        {product?.stock <= 5 && (
          <p className={styles.stockWarning}>Only {product.stock} left in stock</p>
        )}
      </div>
      
      <div className={styles.controls}>
        <div className={styles.quantityControl}>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1 || isUpdating}
          >
            −
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= product?.stock || isUpdating}
          >
            +
          </button>
        </div>
        
        <p className={styles.itemTotal}>{formatPrice(itemTotal)}</p>
        
        {!showRemoveConfirm ? (
          <button 
            className={styles.removeButton}
            onClick={confirmRemove}
          >
            Remove
          </button>
        ) : (
          <button 
            className={styles.confirmButton}
            onClick={handleRemove}
          >
            Confirm?
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
