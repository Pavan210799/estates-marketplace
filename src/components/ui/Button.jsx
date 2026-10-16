import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const variants = {
  primary: "bg-ink text-ivory hover:bg-forest",
  forest: "bg-forest text-ivory hover:bg-moss",
  gold: "bg-gold text-ink hover:bg-gold-bright",
  outline: "border border-sand-deep bg-white text-ink hover:border-gold",
  ghost: "bg-transparent text-ink hover:bg-sand/50",
  light: "bg-white/12 text-ivory ring-1 ring-white/30 hover:bg-white/20",
};

export default function Button({
  to,
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const classes = cn(
    "btn-fx inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
