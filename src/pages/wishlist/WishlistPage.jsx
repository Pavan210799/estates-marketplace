import { AnimatePresence, motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import PropertyGrid from "../../components/listings/PropertyGrid";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import { useMarketplace } from "../../context/MarketplaceContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function WishlistPage() {
  useDocumentTitle("Saved homes");
  const { properties, wishlist, removeFromWishlist, clearWishlist } = useMarketplace();
  const saved = properties.filter((property) => wishlist.includes(property.id));

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">Wishlist</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Homes you saved</h1>
          {saved.length ? (
            <p className="mt-2 text-sm text-stone">
              {saved.length} {saved.length === 1 ? "home" : "homes"} saved
            </p>
          ) : null}
        </div>
        {saved.length ? (
          <Button variant="outline" onClick={clearWishlist} className="text-danger">
            <Trash2 size={16} />
            Clear all
          </Button>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        {saved.length ? (
          <motion.div key="list" className="mt-10" exit={{ opacity: 0 }}>
            <PropertyGrid
              properties={saved}
              cardProps={{ onRemove: removeFromWishlist, removeLabel: "Remove from saved" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="mt-10 rounded-[1.75rem] bg-white px-6 py-16 text-center ring-1 ring-sand"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ivory text-gold-deep ring-1 ring-sand">
              <Heart size={22} />
            </span>
            <p className="mt-5 font-serif text-3xl">Nothing saved yet</p>
            <p className="mx-auto mt-3 max-w-md text-sm text-stone">
              Tap the heart on any residence to keep it here for later.
            </p>
            <Button to="/listings" className="mt-8">
              Browse residences
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
