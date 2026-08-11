import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer } from '../../styles/animations';
import { useFoodFilter } from '../../context/FoodFilterContext';
import { useCart } from '../../context/CartContext';
import FoodCard from '../ui/FoodCard';
import { FiSearch } from 'react-icons/fi';
import styles from './PopularFoods.module.css';

export default function PopularFoods() {
  const { filteredFoods, searchTerm, selectedCategory, setSelectedCategory } = useFoodFilter();
  const { addItem } = useCart();
  const [favorites, setFavorites] = useState(new Set());
  const [quantities, setQuantities] = useState({});

  const toggleFavorite = (id) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleQuantity = (id, qty) =>
    setQuantities((prev) => ({ ...prev, [id]: qty }));

  const handleAdd = (food, qty) => {
    addItem(food, qty);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
  };

  const showFilters = !!searchTerm || selectedCategory !== 'All';

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Popular Foods</h2>
        <p className={styles.subtitle}>
          {filteredFoods.length} item{filteredFoods.length !== 1 ? 's' : ''} found
          {searchTerm && <span> for &quot;{searchTerm}&quot;</span>}
          {selectedCategory !== 'All' && <span> in {selectedCategory}</span>}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {filteredFoods.length === 0 ? (
          <motion.div
            key="empty"
            className={styles.empty}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <FiSearch className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No results found</h3>
            <p className={styles.emptyText}>
              Try adjusting your search or filter, then check out our full menu.
            </p>
            {showFilters && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={styles.clearBtn}
                onClick={handleClearFilters}
                type="button"
              >
                Clear filters
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            className={styles.grid}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                quantity={quantities[food.id] ?? 1}
                isFavorite={favorites.has(food.id)}
                onQuantityChange={(qty) => handleQuantity(food.id, qty)}
                onToggleFavorite={() => toggleFavorite(food.id)}
                onAddToCart={handleAdd}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
