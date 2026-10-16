import { useEffect } from "react";

const TARGETS = "button, .btn-fx, .icon-btn, .page-btn";

export default function RippleLayer() {
  useEffect(() => {
    function onPointerDown(event) {
      const target = event.target.closest?.(TARGETS);
      if (!target || target.disabled || target.getAttribute("aria-disabled") === "true") return;

      if (getComputedStyle(target).position === "static") target.style.position = "relative";
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;

      const host = document.createElement("span");
      host.className = "ripple-host";
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      host.appendChild(ripple);
      target.appendChild(host);
      ripple.addEventListener("animationend", () => host.remove(), { once: true });
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return null;
}
