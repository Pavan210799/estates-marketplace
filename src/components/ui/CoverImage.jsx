import { useState } from "react";
import { cn } from "../../lib/utils";

export default function CoverImage({
  src,
  alt,
  className = "",
  priority = false,
  fit = "cover",
  fill = false,
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fitClass =
    fit === "contain"
      ? "max-h-full max-w-full object-contain"
      : fill
        ? "absolute inset-0 h-full w-full object-cover"
        : "h-full w-full object-cover";

  const image =
    !src || failed ? (
      <div
        className={cn("bg-forest", fill ? "absolute inset-0" : "h-full w-full", !fill && className)}
        role="img"
        aria-label={alt}
      />
    ) : (
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        onLoad={() => setLoaded(true)}
        ref={(node) => {
          if (node?.complete && node.naturalWidth > 0 && !loaded) setLoaded(true);
        }}
        className={cn(
          fitClass,
          "transition-opacity duration-500 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    );

  if (!fill) return image;

  return (
    <span className={cn("media-clip absolute inset-0 block", loaded ? "bg-transparent" : "bg-sand")}>
      {image}
    </span>
  );
}
