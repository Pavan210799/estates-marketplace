import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mark } from "../brand/Logo";
import { easeOut } from "../../lib/motion";

const LOAD_MS = 520;

function PageLoader() {
  return (
    <motion.div
      key="loader"
      className="grid min-h-[70vh] place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative grid h-20 w-20 place-items-center">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-sand border-t-gold"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            animate={{ scale: [0.92, 1, 0.92] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mark className="h-10 w-10" />
          </motion.div>
        </div>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-sand">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: LOAD_MS / 1000, ease: easeOut }}
          />
        </div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone">Preparing your view</p>
      </div>
    </motion.div>
  );
}

export default function PageStage({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), LOAD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {ready ? (
        <motion.div
          key="page"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: easeOut }}
        >
          {children}
        </motion.div>
      ) : (
        <PageLoader />
      )}
    </AnimatePresence>
  );
}
