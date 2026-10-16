export const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const heroStagger = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

export const heroItem = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
