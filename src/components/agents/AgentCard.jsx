import { Link } from "react-router-dom";
import { agentAvatars } from "../../data/media";
import CoverImage from "../ui/CoverImage";
import Monogram from "../landing/Monogram";

export default function AgentCard({ agent, variant = "light" }) {
  const avatar = agentAvatars[agent.id];
  const dark = variant === "dark";

  return (
    <Link
      to={`/agents/${agent.id}`}
      className={`group/card flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] ring-1 transition-[transform,box-shadow,ring-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02] hover:ring-gold/40 hover:shadow-xl hover:shadow-ink/10 ${
        dark ? "bg-white/5 ring-white/10" : "bg-white ring-sand"
      }`}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-[1.75rem]">
        {avatar ? (
          <CoverImage
            src={avatar}
            alt={agent.name}
            fill
            className="object-cover object-[center_20%] transition-transform duration-300 ease-out motion-safe:group-hover/card:scale-[1.05]"
          />
        ) : (
          <div className="grid h-full place-items-center bg-forest">
            <Monogram name={agent.name} tone={agent.tone} className="h-20 w-20 text-3xl" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p
          className={`font-serif text-2xl leading-tight transition-colors duration-300 group-hover/card:text-gold-bright ${dark ? "text-ivory" : "text-ink group-hover/card:text-forest"}`}
        >
          {agent.name}
        </p>
        <p
          className={`mt-1 text-[11px] uppercase tracking-[0.16em] ${
            dark ? "text-gold-bright" : "text-gold-deep"
          }`}
        >
          {agent.role}
        </p>
        <p className={`mt-4 text-sm leading-6 ${dark ? "text-ivory/75" : "text-stone"}`}>
          {agent.focus}
        </p>
      </div>
    </Link>
  );
}
