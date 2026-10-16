import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const sizes = {
  sm: { mark: "h-8 w-8", title: "text-[1.35rem]", tagline: "text-[9px]" },
  md: { mark: "h-10 w-10", title: "text-[1.65rem]", tagline: "text-[10px]" },
  lg: { mark: "h-12 w-12", title: "text-3xl", tagline: "text-[11px]" },
};

function Mark({ className }) {
  return (
    <img
      src="/logo-mark.svg"
      alt=""
      width={64}
      height={64}
      className={cn("shrink-0 object-contain", className)}
      decoding="async"
    />
  );
}

export default function Logo({
  to = "/",
  size = "md",
  variant = "light",
  showTagline = true,
  tagline = "Private marketplace",
  className,
  asLink = true,
}) {
  const s = sizes[size] ?? sizes.md;
  const dark = variant === "dark";

  const content = (
    <>
      <Mark className={s.mark} />
      <span className="min-w-0">
        <span
          className={cn(
            "block font-serif leading-none tracking-tight",
            s.title,
            dark ? "text-ivory" : "text-ink",
          )}
        >
          Estates.in
        </span>
        {showTagline && tagline ? (
          <span
            className={cn(
              "mt-0.5 block uppercase tracking-[0.22em]",
              s.tagline,
              dark ? "text-ivory/70" : "text-stone",
              size === "md" && "hidden sm:block",
            )}
          >
            {tagline}
          </span>
        ) : null}
      </span>
    </>
  );

  const wrapClass = cn("flex min-w-0 items-center gap-2.5", className);

  if (!asLink) {
    return (
      <div className={wrapClass} aria-label="Estates.in">
        {content}
      </div>
    );
  }

  return (
    <Link to={to} className={wrapClass} aria-label="Estates.in home">
      {content}
    </Link>
  );
}

export { Mark };
