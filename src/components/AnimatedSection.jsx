import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedSection({ children, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    // Le decimos que considere el "viewport" 100px más pequeño desde abajo.
    // Esto asegura que el usuario DEBE hacer scroll para que la animación se active.
    margin: "0px 0px -100px 0px"
  });

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