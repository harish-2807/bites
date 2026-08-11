import { motion } from 'framer-motion';
import { allCategories } from '../../constants/categories';
import { useFoodFilter } from '../../context/FoodFilterContext';
import styles from './Categories.module.css';

export default function Categories() {
  const { selectedCategory, setSelectedCategory } = useFoodFilter();

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Categories</h2>
        <p className={styles.subtitle}>Browse by what you're craving</p>
      </div>

      <div className={styles.grid}>
        {allCategories.map((category) => {
          const isActive = selectedCategory === category.name;
          return (
            <motion.button
              key={category.id}
              type="button"
              className={[styles.card, isActive ? styles.active : ''].filter(Boolean).join(' ')}
              onClick={() => setSelectedCategory(category.name)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className={styles.imageWrap}>
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className={styles.image}
                />
              </div>
              <span className={styles.label}>{category.name}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
