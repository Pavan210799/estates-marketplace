import { Mail, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PropertyGrid from "../../components/listings/PropertyGrid";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import CoverImage from "../../components/ui/CoverImage";
import { findAgent } from "../../data/agents";
import { agentAvatars } from "../../data/media";
import { useMarketplace } from "../../context/MarketplaceContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Monogram from "../../components/landing/Monogram";

export default function AgentProfilePage() {
  const { id } = useParams();
  const agent = findAgent(id);
  const { properties } = useMarketplace();
  const listings = properties.filter((property) => property.agentId === id);

  useDocumentTitle(agent?.name ?? "Advisor");

  if (!agent) {
    return (
      <Container className="py-16 text-center">
        <h1 className="font-serif text-4xl">Advisor not found</h1>
        <Button to="/agents" className="mt-6">
          All advisors
        </Button>
      </Container>
    );
  }

  const avatar = agentAvatars[agent.id];

  return (
    <Container className="py-10 sm:py-14">
      <Link to="/agents" className="text-sm text-stone">
        ← All advisors
      </Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-sand">
          <div className="relative aspect-[4/5] max-h-[520px] rounded-[inherit]">
            {avatar ? (
              <CoverImage src={avatar} alt="" fill className="object-cover object-top" />
            ) : (
              <div className="grid h-full place-items-center bg-forest">
                <Monogram name={agent.name} tone={agent.tone} className="h-28 w-28 text-4xl" />
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">{agent.role}</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{agent.name}</h1>
          <p className="mt-4 text-sm leading-7 text-stone">{agent.bio}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 ring-1 ring-sand">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-stone">Experience</dt>
              <dd className="mt-1 font-serif text-2xl">{agent.experience} years</dd>
            </div>
            <div className="rounded-2xl bg-white p-4 ring-1 ring-sand">
              <dt className="text-[10px] uppercase tracking-[0.14em] text-stone">Languages</dt>
              <dd className="mt-1 text-sm">{agent.languages.join(", ")}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${agent.phone.replace(/\s/g, "")}`}
              className="btn-fx inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-forest text-sm font-medium text-ivory"
            >
              <Phone size={16} />
              {agent.phone}
            </a>
            <a
              href={`mailto:${agent.email}`}
              className="btn-fx inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white text-sm font-medium ring-1 ring-sand"
            >
              <Mail size={16} />
              Email
            </a>
          </div>
        </div>
      </div>

      {listings.length ? (
        <section className="mt-16">
          <h2 className="font-serif text-3xl">Residences with {agent.name.split(" ")[0]}</h2>
          <div className="mt-8">
            <PropertyGrid properties={listings.slice(0, 6)} />
          </div>
        </section>
      ) : null}
    </Container>
  );
}
