import { NEIGHBOURHOODS } from "../../data/content";

export default function NeighborhoodMarquee() {
  return (
    <div className="overflow-hidden border-b border-sand bg-white">
      <div className="marquee-track py-5">
        {[...NEIGHBOURHOODS, ...NEIGHBOURHOODS].map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="flex items-center gap-6 px-3 text-[11px] uppercase tracking-[0.28em] text-stone"
          >
            {name}
            <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
