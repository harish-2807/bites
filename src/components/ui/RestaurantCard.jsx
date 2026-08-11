import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiMapPin, FiClock, FiHeart, FiMenu } from 'react-icons/fi';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';
import styles from './RestaurantCard.module.css';

export default function RestaurantCard({ restaurant }) {
  const {
    id,
    name,
    image,
    cuisine,
    rating,
    reviews,
    deliveryTime,
    distance,
    startingPrice,
    offer,
    offerNote,
    isOpen,
  } = restaurant;
  const [loaded, setLoaded] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className={styles.imageWrapper}>
        {!loaded && <Skeleton className={styles.imageSkeleton} />}
        <img
          src={image}
          alt={name}
          className={`${styles.image} ${loaded ? styles.loaded : ''}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        <span className={`${styles.statusBadge} ${isOpen ? styles.statusOpen : styles.statusClosed}`}>
          {isOpen ? 'Open' : 'Closed'}
        </span>
        <motion.button
          type="button"
          className={`${styles.favBtn} ${isFav ? styles.favorited : ''}`}
          onClick={() => setIsFav(!isFav)}
          aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
          whileTap={{ scale: 0.9 }}
        >
          <FiHeart aria-hidden="true" />
        </motion.button>
      </div>

      <div className={styles.body}>
        <div className={styles.headerRow}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.price}>₹{startingPrice.toFixed(2)}</span>
        </div>
        <p className={styles.cuisine}>{cuisine}</p>
        <div className={styles.ratingRow}>
          <FiStar className={styles.star} aria-hidden="true" />
          <span className={styles.rating}>{rating}</span>
          <span className={styles.reviews}>({reviews})</span>
        </div>
        <div className={styles.meta}>
          <span>
            <FiClock aria-hidden="true" />
            {deliveryTime}
          </span>
          <span>
            <FiMapPin aria-hidden="true" />
            {distance}
          </span>
        </div>
        <div className={styles.footer}>
          <span className={styles.offerBadge}>
            {offer}
            {offerNote && <small className={styles.offerNote}>{offerNote}</small>}
          </span>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button size="sm" icon={FiMenu} iconPosition="right" onClick={() => navigate(`/restaurants/${id}`)}>
              View Menu
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
