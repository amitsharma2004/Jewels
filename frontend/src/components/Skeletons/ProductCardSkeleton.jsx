import styles from './ProductCardSkeleton.module.css';

const ProductCardSkeleton = () => {
  return (
    <div className={styles.skeleton} aria-busy="true" aria-label="Loading product">
      <div className={styles.imageBox}></div>
      <div className={styles.content}>
        <div className={styles.line}></div>
        <div className={styles.lineShort}></div>
        <div className={styles.button}></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
