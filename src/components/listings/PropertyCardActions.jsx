import { motion } from "framer-motion";
import { GitCompare, Heart } from "lucide-react";
import { useMarketplace } from "../../context/MarketplaceContext";
import { cn } from "../../lib/utils";

const pop = {
  initial: { scale: 0.4, rotate: -12 },
  animate: { scale: [0.4, 1.3, 1], rotate: 0 },
  transition: { duration: 0.45, ease: "easeOut" },
};

export default function PropertyCardActions({ propertyId, className = "" }) {
  const { isWishlisted, isCompared, toggleWishlist, toggleCompare } = useMarketplace();
  const saved = isWishlisted(propertyId);
  const compared = isCompared(propertyId);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        className={cn("icon-btn h-10 w-10 rounded-full p-0", saved && "bg-forest text-ivory")}
        aria-label="Save home"
        aria-pressed={saved}
        onClick={(event) => {
          event.preventDefault();
          toggleWishlist(propertyId);
        }}
      >
        <motion.span key={String(saved)} className="grid place-items-center" {...(saved ? pop : {})}>
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </motion.span>
      </button>
      <button
        type="button"
        className={cn("icon-btn h-10 w-10 rounded-full p-0", compared && "bg-gold text-ink")}
        aria-label="Compare home"
        aria-pressed={compared}
        onClick={(event) => {
          event.preventDefault();
          toggleCompare(propertyId);
        }}
      >
        <motion.span key={String(compared)} className="grid place-items-center" {...(compared ? pop : {})}>
          <GitCompare size={16} />
        </motion.span>
      </button>
    </div>
  );
}
