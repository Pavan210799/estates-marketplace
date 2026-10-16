import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CoverImage from "../ui/CoverImage";

export default function Gallery({ images, title }) {
  const [active, setActive] = useState(0);
  const safe = images?.length ? images : [""];

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.55fr)] lg:items-start">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 ring-sand">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="media-clip absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <CoverImage src={safe[active]} alt={title} fill priority className="object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-2">
        {safe.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className={`btn-fx relative aspect-square overflow-hidden rounded-2xl ring-2 ${
              index === active ? "ring-gold" : "ring-transparent opacity-75 hover:opacity-100"
            }`}
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={index === active}
          >
            <CoverImage src={src} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
