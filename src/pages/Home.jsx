import { useRef } from 'react';
import Hero from '../components/layout/Hero';
import Categories from '../components/sections/Categories';
import PopularFoods from '../components/sections/PopularFoods';
import ScrollAnimate from '../components/ui/ScrollAnimate';

export default function Home() {
  const foodsRef = useRef(null);

  const handleOrderNow = () => {
    foodsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onOrderNow={handleOrderNow} />
      <ScrollAnimate>
        <Categories />
      </ScrollAnimate>
      <div ref={foodsRef} style={{ scrollMarginTop: '5rem' }}>
        <PopularFoods />
      </div>
    </>
  );
}
