import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export const inputClass =
  "h-11 w-full min-w-0 rounded-xl border border-sand bg-white px-3 text-sm text-ink outline-none transition placeholder:text-stone/70 focus:border-gold disabled:cursor-not-allowed disabled:bg-sand/40 disabled:text-stone";

function FieldShell({ id, label, hint, error, children }) {
  return (
    <div className="min-w-0">
      {label ? (
        <label
          htmlFor={id}
          className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-stone"
        >
          {label}
        </label>
      ) : null}
      {children}
      {hint && !error ? <p className="mt-1 text-xs leading-5 text-stone">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs leading-5 text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({ id, label, hint, error, className, ...props }) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, error && "border-danger", className)}
        {...props}
      />
    </FieldShell>
  );
}

export function PasswordField({ id, label, hint, error, className, ...props }) {
  const [visible, setVisible] = useState(false);
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(inputClass, "pr-12", error && "border-danger", className)}
          {...props}
        />
        <button
          type="button"
          className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-stone transition-colors hover:bg-sand/60 hover:text-ink"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </FieldShell>
  );
}

export function TextArea({ id, label, hint, error, className, ...props }) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          inputClass,
          "h-auto min-h-32 resize-y py-3",
          error && "border-danger",
          className,
        )}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({ id, label, hint, error, children, className, ...props }) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, error && "border-danger", className)}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}
