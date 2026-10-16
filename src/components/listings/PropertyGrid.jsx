import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import PropertyCard from "./PropertyCard";

function itemClass(index, total, columns) {
  const isLast = index === total - 1;
  const oddTail = total % 2 === 1 && isLast;

  if (columns === 2) {
    return cn(oddTail && "md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]");
  }

  const remainder = total % 3;
  return cn(
    "lg:col-span-2",
    oddTail && "md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)] lg:mx-0 lg:w-auto lg:col-span-2",
    remainder === 1 && isLast && "lg:col-start-3",
    remainder === 2 && index === total - 2 && "lg:col-start-2",
  );
}

export default function PropertyGrid({
  properties,
  columns = 3,
  priorityCount = 0,
  cardProps = {},
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 overflow-x-clip md:grid-cols-2",
        columns === 3 && "lg:grid-cols-6",
      )}
    >
      <AnimatePresence mode="popLayout" initial>
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            layout
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
            transition={{
              default: { duration: 0.5, delay: Math.min(index, 8) * 0.06, ease: [0.22, 1, 0.36, 1] },
              layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            }}
            className={cn("min-w-0 py-1", itemClass(index, properties.length, columns))}
          >
            <PropertyCard property={property} priority={index < priorityCount} {...cardProps} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
