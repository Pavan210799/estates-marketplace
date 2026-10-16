import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useMarketplace } from "../../context/MarketplaceContext";

export default function Toast() {
  const { toast } = useMarketplace();
  return (
    <div
      className="pointer-events-none fixed inset-x-4 top-20 z-[80] flex justify-center"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {toast ? (
          <motion.p
            key={toast}
            className="flex max-w-sm items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm text-ivory shadow-xl shadow-ink/30"
            initial={{ opacity: 0, y: -16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
          >
            <CheckCircle2 size={16} className="shrink-0 text-gold-bright" />
            {toast}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
