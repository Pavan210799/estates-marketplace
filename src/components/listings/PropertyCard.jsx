import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMarketplace } from "../../context/MarketplaceContext";
import { bedroomLabel, formatArea, formatPrice } from "../../lib/utils";
import CoverImage from "../ui/CoverImage";
import PropertyCardActions from "./PropertyCardActions";

export default function PropertyCard({
  property,
  priority = false,
  allowDelete = false,
  onRemove,
  removeLabel = "Remove",
}) {
  const { isOwnListing, deleteSubmission } = useMarketplace();
  const [confirming, setConfirming] = useState(false);
  const own = isOwnListing(property.id);
  const canDelete = allowDelete && own;

  return (
    <article className="group/card property-card flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-sand transition-[transform,box-shadow,ring-color,background-color] duration-200 ease-out will-change-transform motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.02] hover:bg-parchment/30 hover:shadow-[0_24px_48px_-20px_rgba(20,18,15,0.22)] hover:ring-gold/45">
      <div className="property-card-media relative aspect-[5/4] overflow-hidden">
        <Link to={`/property/${property.id}`} className="property-card-media-link absolute inset-0 block">
          <CoverImage
            src={property.images?.[0]}
            alt={`${property.title} in ${property.locality}, ${property.city}`}
            priority={priority}
            fill
            className="transition-transform duration-200 ease-out motion-safe:group-hover/card:scale-[1.05]"
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover/card:opacity-100" />
        <div className="absolute left-3 top-3 z-[1] flex max-w-[calc(100%-1rem)] flex-wrap gap-2">
          <span className="rounded-full bg-ivory/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink shadow-sm">
            {property.status === "For Rent" ? "Rent" : "Sale"}
          </span>
          {own ? (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink shadow-sm">
              Your listing
            </span>
          ) : property.featured ? (
            <span className="rounded-full bg-forest/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ivory shadow-sm">
              Featured
            </span>
          ) : null}
        </div>
        <div className="absolute right-3 top-3 z-[1] flex items-center gap-2">
          <PropertyCardActions propertyId={property.id} />
          {canDelete ? (
            <button
              type="button"
              className="icon-btn h-10 w-10 rounded-full p-0 text-danger"
              aria-label="Delete your listing"
              onClick={() => setConfirming(true)}
            >
              <Trash2 size={16} />
            </button>
          ) : null}
        </div>

        <AnimatePresence>
          {confirming ? (
            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-ink/80 p-6 text-center text-ivory backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="grid h-12 w-12 place-items-center rounded-full bg-danger/90"
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Trash2 size={20} />
              </motion.div>
              <p className="font-serif text-2xl leading-tight">Delete this listing?</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn-fx inline-flex h-10 items-center rounded-full bg-white/15 px-4 text-sm ring-1 ring-white/30"
                  onClick={() => setConfirming(false)}
                >
                  Keep it
                </button>
                <button
                  type="button"
                  className="btn-fx inline-flex h-10 items-center rounded-full bg-danger px-4 text-sm font-medium"
                  onClick={() => deleteSubmission(property.id)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="flex flex-1 flex-col p-5 transition-colors duration-500 group-hover/card:bg-white/80">
        <p className="font-serif text-2xl leading-none text-forest transition-[color,transform] duration-200 group-hover/card:text-gold-deep group-hover/card:translate-x-0.5">
          {formatPrice(property)}
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-snug">
          <Link
            to={`/property/${property.id}`}
            className="text-ink transition-colors duration-200 group-hover/card:text-forest"
          >
            {property.title}
          </Link>
        </h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-stone transition-colors duration-200 group-hover/card:text-ink">
          <MapPin
            size={15}
            className="mt-0.5 shrink-0 transition-colors duration-200 group-hover/card:text-gold"
          />
          <span>
            {property.locality}, {property.city}
          </span>
        </p>
        <dl className="mt-5 grid grid-cols-3 gap-0 border-y border-sand py-4 text-center text-xs transition-colors duration-200 group-hover/card:border-gold/30">
          <div className="min-w-0 px-1">
            <dt className="text-[10px] uppercase tracking-[0.12em] text-stone transition-colors group-hover/card:text-gold-deep">
              Beds
            </dt>
            <dd className="mt-1 font-medium text-ink transition-colors duration-200 group-hover/card:text-forest">
              {bedroomLabel(property)}
            </dd>
          </div>
          <div className="min-w-0 border-x border-sand px-1 transition-colors group-hover/card:border-gold/30">
            <dt className="text-[10px] uppercase tracking-[0.12em] text-stone transition-colors group-hover/card:text-gold-deep">
              Baths
            </dt>
            <dd className="mt-1 font-medium text-ink transition-colors duration-200 group-hover/card:text-forest">
              {property.bathrooms}
            </dd>
          </div>
          <div className="min-w-0 px-1">
            <dt className="text-[10px] uppercase tracking-[0.12em] text-stone transition-colors group-hover/card:text-gold-deep">
              Area
            </dt>
            <dd className="mt-1 font-medium text-ink transition-colors duration-200 group-hover/card:text-forest">
              {formatArea(property.area)}
            </dd>
          </div>
        </dl>
        {onRemove ? (
          <button
            type="button"
            className="btn-fx mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-sand-deep text-sm font-medium text-danger"
            onClick={() => onRemove(property.id)}
          >
            <X size={16} />
            {removeLabel}
          </button>
        ) : null}
      </div>
    </article>
  );
}
