/* eslint-disable react/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import { foods } from '../data/foods';

const FoodFilterContext = createContext();

export function FoodFilterProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFoods = useMemo(
    () =>
      foods.filter((food) => {
        const term = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !term ||
          food.name.toLowerCase().includes(term) ||
          food.category.toLowerCase().includes(term) ||
          (food.description && food.description.toLowerCase().includes(term));
        const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [searchTerm, selectedCategory]
  );

  return (
    <FoodFilterContext.Provider
      value={{
        foods,
        filteredFoods,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </FoodFilterContext.Provider>
  );
}

export const useFoodFilter = () => {
  const ctx = useContext(FoodFilterContext);
  if (!ctx) {
    throw new Error('useFoodFilter must be used within a FoodFilterProvider');
  }
  return ctx;
};
