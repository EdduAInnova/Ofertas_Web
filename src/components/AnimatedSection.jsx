import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedSection({ children, className }) {
  const ref = useRef(null);
  // El `once: true` hace que la animación ocurra solo la primera vez.
  // `amount: 0.2` significa que la animación se dispara cuando el 20% de la sección es visible.
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 50 }, // Empieza 50px abajo y transparente
    visible: { opacity: 1, y: 0 },   // Termina en su posición original y opaco
  };

  return (
    <motion.section
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}