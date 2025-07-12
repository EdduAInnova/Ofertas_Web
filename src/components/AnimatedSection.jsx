import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedSection({ children, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    // Hacemos el margen más grande. En pantallas de escritorio altas,
    // la primera sección puede estar visible al cargar. Un margen más
    // grande asegura que el usuario DEBE hacer scroll para que se active la animación.
    margin: "0px 0px -200px 0px"
  });

  const variants = {
    hidden: { opacity: 0, scale: 0.95 }, // Empieza un poco más pequeño y transparente
    visible: { opacity: 1, scale: 1 },   // Termina en su tamaño original y opaco
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