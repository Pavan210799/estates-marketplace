import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import PropertyFilters from "./PropertyFilters";

export default function ListingsFilterSheet({ open, onClose, filterProps }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 0.35 } }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-ink/45"
            aria-label="Close filters"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 top-16 flex flex-col rounded-t-3xl bg-ivory shadow-2xl sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[min(100%,24rem)] sm:rounded-none"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-sand px-5 py-4">
              <h2 className="font-serif text-3xl">Filters</h2>
              <button
                type="button"
                className="icon-btn h-10 w-10 rounded-full p-0"
                aria-label="Close filters"
                onClick={onClose}
              >
                <X size={18} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              <PropertyFilters {...filterProps} idPrefix="sheet" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
