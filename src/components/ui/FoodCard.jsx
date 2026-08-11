import { useState } from 'react';
import { FiHeart, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp } from '../../styles/animations';
import Button from './Button';
import QuantitySelector from './QuantitySelector';
import Skeleton from './Skeleton';
import styles from './FoodCard.module.css';

export default function FoodCard({ food, quantity, isFavorite, onQuantityChange, onToggleFavorite, onAddToCart }) {
  const { name, price, rating, reviews, image, description, isVeg, category } = food;
  const safeQuantity = quantity ?? 1;
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      layout
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        <AnimatePresence>
          {!loaded && <Skeleton className={styles.imageSkeleton} />}
        </AnimatePresence>
        <img
          src={image}
          alt={name}
          className={`${styles.image} ${loaded ? styles.loaded : ''}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        <button
          type="button"
          className={`${styles.favorite} ${isFavorite ? styles.favorited : ''}`}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiHeart aria-hidden="true" />
        </button>
        {isVeg && (
          <span className={styles.vegBadge} aria-label="Vegetarian">
            🟢
          </span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.headerRow}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.category}>{category}</span>
        </div>

        <div className={styles.ratingRow}>
          <FiStar className={styles.star} aria-hidden="true" />
          <span className={styles.rating}>{rating}</span>
          <span className={styles.reviews}>({reviews} reviews)</span>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <span className={styles.price}>₹{price.toFixed(2)}</span>
          <QuantitySelector quantity={safeQuantity} onChange={onQuantityChange} />
          {isFavorite && (
            <motion.div
              className={styles.favoriteIndicator}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <FiHeart fill="currentColor" />
            </motion.div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <motion.div whileHover={{ scale: onAddToCart ? 1.02 : 1 }}>
          <Button
            variant="primary"
            size="md"
            className={styles.addBtn}
            onClick={() => onAddToCart?.(food, safeQuantity)}
          >
            Add to Cart
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
