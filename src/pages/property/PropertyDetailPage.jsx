import { ArrowLeft, MapPin, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Gallery from "../../components/property/Gallery";
import PropertyCardActions from "../../components/listings/PropertyCardActions";
import AgentCard from "../../components/agents/AgentCard";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import { findAgent } from "../../data/agents";
import { useMarketplace } from "../../context/MarketplaceContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Reveal from "../../components/ui/Reveal";
import {
  bedroomLabel,
  formatArea,
  formatDate,
  formatExactINR,
  formatPrice,
  mapsUrl,
} from "../../lib/utils";
import { findProperty } from "../../data/properties";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { properties } = useMarketplace();
  const property = findProperty(id, properties);

  useDocumentTitle(property?.title ?? "Residence");

  if (!property) {
    return (
      <Container className="py-16 text-center">
        <h1 className="font-serif text-4xl">Residence not found</h1>
        <Button to="/listings" className="mt-6">
          Back to collection
        </Button>
      </Container>
    );
  }

  const agent = findAgent(property.agentId);

  return (
    <div className="pb-16">
      <Container className="pt-6">
        <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-stone">
          <ArrowLeft size={16} />
          All residences
        </Link>
      </Container>

      <Container className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
        <div className="min-w-0 space-y-8">
          <Gallery images={property.images} title={property.title} />

          <Reveal className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-sand">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gold-deep">Overview</p>
              <p className="mt-4 text-sm leading-7 text-stone">{property.description}</p>
            </div>
            <div className="rounded-[1.75rem] bg-parchment p-6 ring-1 ring-sand">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gold-deep">Location</p>
              <p className="mt-4 flex gap-2 text-sm leading-6 text-ink">
                <MapPin size={18} className="shrink-0 text-gold" />
                {property.address}
              </p>
              <a
                href={mapsUrl(property.address)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-medium text-forest"
              >
                Open in Maps
              </a>
              <ul className="mt-5 space-y-2 border-t border-sand pt-5 text-sm text-stone">
                {property.nearby?.map((place) => (
                  <li key={place.name} className="flex justify-between gap-4">
                    <span>{place.name}</span>
                    <span className="text-ink">{place.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-3xl">Amenities</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {property.amenities?.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl bg-white px-4 py-3 text-center text-sm text-ink ring-1 ring-sand transition-[transform,box-shadow,ring-color,background-color,color] duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-parchment/50 motion-safe:hover:text-forest motion-safe:hover:shadow-md motion-safe:hover:ring-gold/45"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-sand">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold-deep">
              {property.status}
            </p>
            <p className="mt-2 font-serif text-4xl text-forest">{formatPrice(property)}</p>
            <p className="mt-1 text-xs text-stone">{formatExactINR(property.price)} total</p>
            <h1 className="mt-5 font-serif text-3xl leading-tight">{property.title}</h1>
            <p className="mt-2 text-sm text-stone">
              {property.locality}, {property.city} · Listed {formatDate(property.listedOn)}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-parchment p-3 text-center">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-stone">Config</dt>
                <dd className="mt-1 font-medium">{bedroomLabel(property)}</dd>
              </div>
              <div className="rounded-2xl bg-parchment p-3 text-center">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-stone">Area</dt>
                <dd className="mt-1 font-medium">{formatArea(property.area)}</dd>
              </div>
              <div className="rounded-2xl bg-parchment p-3 text-center">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-stone">Facing</dt>
                <dd className="mt-1 font-medium">{property.facing}</dd>
              </div>
              <div className="rounded-2xl bg-parchment p-3 text-center">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-stone">Parking</dt>
                <dd className="mt-1 font-medium">{property.parking}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              <PropertyCardActions propertyId={property.id} />
            </div>
            {agent ? (
              <a
                href={`tel:${agent.phone.replace(/\s/g, "")}`}
                className="btn-fx mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-forest text-sm font-medium text-ivory"
              >
                <Phone size={16} />
                Speak with {agent.name.split(" ")[0]}
              </a>
            ) : null}
          </div>
          {agent ? <AgentCard agent={agent} /> : null}
        </aside>
      </Container>
    </div>
  );
}
