import { AGENTS } from "../../data/agents";
import AgentCard from "../../components/agents/AgentCard";
import Container from "../../components/ui/Container";
import CoverImage from "../../components/ui/CoverImage";
import { landingStills } from "../../data/media";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Reveal from "../../components/ui/Reveal";

export default function AgentsPage() {
  useDocumentTitle("Advisors");

  return (
    <>
      <div className="relative isolate min-h-[280px] overflow-hidden bg-ink sm:min-h-[320px]">
        <CoverImage src={landingStills.collection} alt="" fill className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/40" />
        <Container className="relative flex min-h-[280px] flex-col justify-end py-12 sm:min-h-[320px] sm:py-14">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold-bright">Advisors</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl text-ivory sm:text-6xl">
            People who have walked the buildings
          </h1>
        </Container>
      </div>
      <Container className="py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {AGENTS.map((agent, index) => (
            <Reveal key={agent.id} delay={(index % 3) * 0.1} className="h-full">
              <AgentCard agent={agent} />
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
