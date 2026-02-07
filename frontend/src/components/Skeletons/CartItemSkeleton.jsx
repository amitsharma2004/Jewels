import styles from './CartItemSkeleton.module.css';

const CartItemSkeleton = () => {
  return (
    <div className={styles.skeleton} aria-busy="true" aria-label="Loading cart item">
      <div className={styles.imageBox}></div>
      <div className={styles.details}>
        <div className={styles.line}></div>
        <div className={styles.lineShort}></div>
      </div>
      <div className={styles.controls}>
        <div className={styles.quantityBox}></div>
        <div className={styles.priceBox}></div>
        <div className={styles.buttonBox}></div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
