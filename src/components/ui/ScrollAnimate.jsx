import { motion } from 'framer-motion';

export default function ScrollAnimate({
  children,
  delay = 0,
  y = 28,
  x = 0,
  once = true,
  margin = '-64px',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
