import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiClock, FiArrowLeft } from 'react-icons/fi';
import FoodCard from '../components/ui/FoodCard';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { getRestaurant, getMenu } from '../data/restaurants';
import styles from './RestaurantDetails.module.css';

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const restaurant = getRestaurant(id);
  const menu = getMenu(id);

  const [favorites, setFavorites] = useState(new Set());
  const [quantities, setQuantities] = useState({});

  if (!restaurant) {
    return (
      <section className={styles.notFound}>
        <h2>Restaurant not found</h2>
        <Button variant="outline" onClick={() => navigate('/restaurants')}>
          Back to restaurants
        </Button>
      </section>
    );
  }

  const toggleFavorite = (foodId) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(foodId)) next.delete(foodId);
      else next.add(foodId);
      return next;
    });

  const handleAdd = (food, qty) => {
    addItem(food, qty);
    openCart();
  };

  return (
    <>
      <div className={styles.bannerWrapper}>
        <img src={restaurant.image} alt={restaurant.name} className={styles.banner} loading="eager" />
        <Link to="/restaurants" className={styles.backLink} aria-label="Back to restaurants">
          <FiArrowLeft aria-hidden="true" />
        </Link>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>{restaurant.name}</h1>
          <p className={styles.bannerCuisine}>{restaurant.cuisine}</p>
          <span
            className={`${styles.statusBadge} ${restaurant.isOpen ? styles.open : styles.closed}`}
            aria-label={restaurant.isOpen ? 'Open now' : 'Closed'}
            title={restaurant.isOpen ? 'Open now' : 'Closed'}
          >
            {restaurant.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      <div className={styles.container}>
        <header className={styles.info}>
          <div className={styles.infoHead}>
            <h2 className={styles.name}>{restaurant.name}</h2>
            <span className={styles.offerBadge}>
              {restaurant.offer}
              <small className={styles.offerNote}>{restaurant.offerNote}</small>
            </span>
          </div>
          <p className={styles.cuisine}>{restaurant.cuisine}</p>
          <div className={styles.ratingRow}>
            <FiStar className={styles.star} aria-hidden="true" />
            <span className={styles.rating}>{restaurant.rating}</span>
            <span className={styles.reviews}>({restaurant.reviews} reviews)</span>
          </div>
          <div className={styles.meta}>
            <span>
              <FiClock aria-hidden="true" />
              {restaurant.deliveryTime}
            </span>
            <span>
              <FiMapPin aria-hidden="true" />
              {restaurant.distance}
            </span>
            <span>Starting ₹{restaurant.startingPrice.toFixed(2)}</span>
          </div>
        </header>

        {menu.length === 0 && <p className={styles.empty}>No menu items available for this restaurant.</p>}

        {menu.map((section) => (
          <motion.section
            key={section.category}
            className={styles.menuSection}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <h3 className={styles.sectionTitle}>{section.category}</h3>
            <div className={styles.menuGrid}>
              {section.items.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  quantity={quantities[food.id] ?? 1}
                  isFavorite={favorites.has(food.id)}
                  onQuantityChange={(qty) => setQuantities((p) => ({ ...p, [food.id]: qty }))}
                  onToggleFavorite={() => toggleFavorite(food.id)}
                  onAddToCart={handleAdd}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </>
  );
}
