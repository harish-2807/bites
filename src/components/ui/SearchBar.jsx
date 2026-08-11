import { FiSearch } from 'react-icons/fi';
import styles from './SearchBar.module.css';

export default function SearchBar({
  id = 'site-search',
  value = '',
  placeholder = 'Search for food, restaurants...',
  onChange,
  onSubmit,
  className = '',
}) {
  const handleChange = (e) => onChange?.(e.target.value);
  const handleSubmit = (e) => {
    if (onSubmit) {
      e.preventDefault();
      onSubmit(value);
    }
  };

  return (
    <form
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      role="search"
      onSubmit={handleSubmit}
    >
      <label htmlFor={id} className={styles.label}>
        <FiSearch className={styles.icon} aria-hidden="true" />
      </label>
      <input
        id={id}
        className={styles.input}
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label="Search food and restaurants"
        onChange={handleChange}
      />
    </form>
  );
}
