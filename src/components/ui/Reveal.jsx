import { motion } from "framer-motion";
import { easeOut } from "../../lib/motion";

export default function Reveal({ children, className, delay = 0, y = 36, as = "div", amount = 0.15 }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
    >
      {children}
    </Tag>
  );
}
