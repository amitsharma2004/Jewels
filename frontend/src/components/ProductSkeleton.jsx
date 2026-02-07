import styles from './ProductSkeleton.module.css';

const ProductSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.imageBox}></div>
      <div className={styles.content}>
        <div className={styles.line}></div>
        <div className={styles.lineShort}></div>
        <div className={styles.button}></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
