import { AGENTS } from "../../data/agents";
import AgentCard from "../agents/AgentCard";
import Button from "../ui/Button";
import Container from "../ui/Container";

export default function AdvisorsSection() {
  return (
    <section className="bg-ink py-16 text-ivory sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold-bright">Advisors</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Faces behind the tours</h2>
          </div>
          <Button to="/agents" variant="light" className="w-full sm:w-auto">
            View all
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {AGENTS.slice(0, 3).map((agent) => (
            <AgentCard key={agent.id} agent={agent} variant="dark" />
          ))}
        </div>
      </Container>
    </section>
  );
}
