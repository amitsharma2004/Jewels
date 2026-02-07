import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.icon}>💎</div>
        <h1 className={styles.title}>Welcome to Naksh Jewels</h1>
        <p className={styles.subtitle}>
          Discover our exquisite collection of handcrafted fine jewelry
        </p>
        <Link to="/products" className={styles.ctaButton}>
          Explore Collection
        </Link>
      </div>
    </div>
  );
};

export default Home;
