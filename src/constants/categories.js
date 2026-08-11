import { CATEGORY_IMAGES, ALL_IMAGE } from './images';

export { CATEGORY_IMAGES, ALL_IMAGE };

export const categories = [
  { id: 'burgers', name: 'Burgers', image: CATEGORY_IMAGES.Burgers },
  { id: 'pizza', name: 'Pizza', image: CATEGORY_IMAGES.Pizza },
  { id: 'indian', name: 'Indian', image: CATEGORY_IMAGES.Indian },
  { id: 'chinese', name: 'Chinese', image: CATEGORY_IMAGES.Chinese },
  { id: 'desserts', name: 'Desserts', image: CATEGORY_IMAGES.Desserts },
  { id: 'beverages', name: 'Beverages', image: CATEGORY_IMAGES.Beverages },
  { id: 'healthy', name: 'Healthy', image: CATEGORY_IMAGES.Healthy },
];

export const allCategories = [
  { id: 'all', name: 'All', image: ALL_IMAGE },
  ...categories,
];
