import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          className="btn-fx fixed bottom-5 right-5 z-[70] grid h-12 w-12 place-items-center rounded-full bg-forest text-ivory shadow-xl shadow-ink/25 sm:bottom-8 sm:right-8"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="var(--color-gold-bright)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp size={18} className="relative" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
