import { useMemo, useState } from 'react';
import { restaurants } from '../data/restaurants';
import RestaurantCard from '../components/ui/RestaurantCard';
import SearchBar from '../components/ui/SearchBar';
import styles from './Restaurants.module.css';

export default function Restaurants() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return restaurants;
    return restaurants.filter(
      (r) => r.name.toLowerCase().includes(term) || r.cuisine.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Restaurants</h1>
        <p className={styles.subtitle}>Discover the best restaurants and cuisines near you.</p>
      </div>

      <div className={styles.controls}>
        <SearchBar
          id="restaurant-search"
          placeholder="Search restaurants..."
          value={query}
          onChange={setQuery}
          onSubmit={() => {}}
          className={styles.search}
        />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No restaurants match your search.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </section>
  );
}
