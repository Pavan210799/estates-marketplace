import { motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import CoverImage from "../../components/ui/CoverImage";
import { useMarketplace } from "../../context/MarketplaceContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { bedroomLabel, formatArea, formatPrice } from "../../lib/utils";

export default function ComparePage() {
  useDocumentTitle("Compare homes");
  const { properties, compare, removeFromCompare, clearCompare } = useMarketplace();
  const items = compare
    .map((id) => properties.find((property) => property.id === id))
    .filter(Boolean);

  const rows = [
    { label: "Price", render: (p) => formatPrice(p) },
    { label: "City", render: (p) => p.city },
    { label: "Type", render: (p) => p.type },
    { label: "Beds", render: (p) => bedroomLabel(p) },
    { label: "Area", render: (p) => formatArea(p.area) },
    { label: "Status", render: (p) => p.status },
  ];

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">Compare</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Side by side</h1>
          {items.length ? (
            <p className="mt-2 text-sm text-stone">{items.length} of 3 slots used</p>
          ) : null}
        </div>
        {items.length ? (
          <Button variant="outline" onClick={clearCompare} className="text-danger">
            <Trash2 size={16} />
            Clear all
          </Button>
        ) : null}
      </div>
      {items.length ? (
        <div className="mt-10 max-w-full overflow-x-auto overscroll-x-contain pb-2">
          <div
            className="grid min-w-[640px] gap-4"
            style={{ gridTemplateColumns: `8rem repeat(${items.length}, minmax(0, 1fr))` }}
          >
            <div />
            {items.map((property, index) => (
              <motion.div
                key={property.id}
                className="overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-sand"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-[1.75rem]">
                  <CoverImage src={property.images[0]} alt="" fill />
                  <button
                    type="button"
                    className="icon-btn absolute right-3 top-3 h-9 w-9 rounded-full p-0 text-danger"
                    aria-label={`Remove ${property.title} from compare`}
                    onClick={() => removeFromCompare(property.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/property/${property.id}`} className="font-serif text-xl leading-snug">
                    {property.title}
                  </Link>
                </div>
              </motion.div>
            ))}
            {rows.map((row) => (
              <Fragment key={row.label}>
                <p className="self-center text-sm font-medium text-stone">{row.label}</p>
                {items.map((property) => (
                  <p
                    key={`${row.label}-${property.id}`}
                    className="rounded-2xl bg-white p-4 text-center text-sm ring-1 ring-sand"
                  >
                    {row.render(property)}
                  </p>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-[1.75rem] bg-white px-6 py-16 text-center ring-1 ring-sand">
          <p className="font-serif text-3xl">Pick up to three homes</p>
          <Button to="/listings" className="mt-8">
            Browse residences
          </Button>
        </div>
      )}
    </Container>
  );
}
