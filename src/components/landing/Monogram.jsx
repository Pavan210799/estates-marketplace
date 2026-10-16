import { TONES } from "../../data/agents";
import { cn } from "../../lib/utils";

export default function Monogram({ name, tone = "forest", className = "" }) {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "E";
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-serif",
        TONES[tone] ?? TONES.forest,
        className,
      )}
      aria-hidden
    >
      {initial}
    </span>
  );
}
