import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Mark } from "../brand/Logo";

const SPLASH_MS = 3000;
const ease = [0.22, 1, 0.36, 1];

const HOUSE_PATHS = [
  "M14 58 L60 20 L106 58",
  "M24 50 V100 H96 V50",
  "M50 100 V72 H70 V100",
  "M32 62 H44 V74 H32 Z",
  "M76 62 H88 V74 H76 Z",
];

function SplashContent({ user, onDone }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, SPLASH_MS);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  const firstName = user.name.split(" ")[0];

  return (
    <motion.div
      className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-ink text-ivory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.9, ease } }}
      style={{ clipPath: "inset(0 0 0% 0)" }}
      role="status"
      aria-live="polite"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,188,148,0.22),transparent_62%)]"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <svg viewBox="0 0 120 112" className="h-28 w-28 text-gold-bright" aria-hidden="true">
          {HOUSE_PATHS.map((d, index) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.15 + index * 0.18, ease: "easeInOut" }}
            />
          ))}
          <motion.circle
            cx="60"
            cy="42"
            r="4"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.6, 1] }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />
        </svg>

        <motion.div
          className="mt-6 flex items-center gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ivory">
            <Mark className="h-8 w-8" />
          </span>
          <span className="font-serif text-2xl tracking-tight">Estates.in</span>
        </motion.div>

        <h2 className="mt-6 overflow-hidden font-serif text-5xl leading-tight sm:text-6xl">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease }}
          >
            Welcome, <span className="text-gold-bright">{firstName}</span>
          </motion.span>
        </h2>
        <motion.p
          className="mt-3 text-sm text-ivory/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.5 }}
        >
          Opening your private collection
        </motion.p>

        <div className="mt-8 h-px w-56 overflow-hidden bg-white/15">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-gold-bright to-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: (SPLASH_MS - 400) / 1000, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function SplashScreen() {
  const { splashUser, dismissSplash } = useAuth();
  return (
    <AnimatePresence>
      {splashUser ? <SplashContent key="splash" user={splashUser} onDone={dismissSplash} /> : null}
    </AnimatePresence>
  );
}
