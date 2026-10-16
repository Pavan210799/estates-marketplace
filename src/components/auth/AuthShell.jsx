import { motion } from "framer-motion";
import { GitCompare, Heart, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Logo from "../brand/Logo";

const STATS = [
  { value: "21+", label: "Curated homes" },
  { value: "10", label: "Indian cities" },
  { value: "6", label: "Advisors" },
];

const PERKS = [
  { icon: Heart, title: "Save homes" },
  { icon: GitCompare, title: "Compare" },
  { icon: ShieldCheck, title: "Private" },
];

const ease = [0.22, 1, 0.36, 1];

function videoSrcForViewport() {
  if (typeof window === "undefined") return "/videos/house.mp4";
  return window.matchMedia("(min-width: 1024px)").matches
    ? "/videos/house-720.mp4"
    : "/videos/house.mp4";
}

function HouseVideo() {
  const ref = useRef(null);
  const [src, setSrc] = useState(videoSrcForViewport);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setSrc(videoSrcForViewport());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.playbackRate = 0.6;
    const play = () => video.play().catch(() => {});
    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });
  }, [src]);

  return (
    <motion.video
      ref={ref}
      key={src}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster="/videos/house-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease }}
    />
  );
}

function AuthBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -right-16 top-6 h-48 w-48 rounded-full bg-gold/12 blur-3xl lg:top-16 lg:h-80 lg:w-80" />
      <div className="absolute bottom-4 left-0 h-40 w-40 rounded-full bg-forest/8 blur-3xl lg:bottom-12 lg:h-64 lg:w-64" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(166 132 86 / 0.12) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}

function VideoPanel() {
  return (
    <div className="relative isolate min-h-[clamp(9rem,30dvh,22rem)] overflow-hidden bg-ink short:min-h-[clamp(8rem,22dvh,12rem)] tiny:min-h-[6.5rem] micro:min-h-0 flat:min-h-0 lg:h-dvh lg:min-h-0">
      <HouseVideo />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-ink/45 lg:from-ink/90 lg:via-ink/30 lg:to-ink/40" />

      <div className="relative flex h-full flex-col justify-between gap-3 p-4 text-ivory sm:p-6 tiny:gap-2 tiny:p-3 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <Logo size="sm" variant="dark" asLink={false} className="sm:hidden" />
          <Logo size="md" variant="dark" asLink={false} className="hidden sm:flex" />
        </motion.div>

        <div className="min-w-0 micro:hidden">
          <motion.p
            className="text-[10px] uppercase tracking-[0.2em] text-gold-bright sm:text-[11px] max-lg:tiny:hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
          >
            Private marketplace
          </motion.p>
          <motion.p
            className="mt-2 max-w-md font-serif text-[1.35rem] leading-tight min-[360px]:text-2xl sm:text-3xl max-lg:tiny:mt-0 max-lg:tiny:text-xl lg:mt-3 lg:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
          >
            Indian homes, privately presented.
          </motion.p>

          <motion.dl
            className="mt-4 hidden grid-cols-3 gap-2 sm:mt-5 sm:grid sm:gap-3 max-lg:short:hidden lg:mt-8 lg:short:mt-5"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } } }}
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                className="rounded-xl bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur-md sm:rounded-2xl sm:px-4 sm:py-3"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-xl leading-none text-gold-bright sm:text-3xl">{stat.value}</dd>
                <dd className="mt-0.5 text-[10px] text-ivory/75 sm:mt-1 sm:text-xs">{stat.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </div>
  );
}

export default function AuthShell({ title, subtitle, children, footer }) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  return (
    <div className="grid h-dvh max-h-dvh grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-ivory flat:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] flat:grid-rows-1 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-1">
      <VideoPanel />

      <div className="relative min-h-0 bg-parchment lg:h-dvh">
        <AuthBackdrop />

        <div className="relative flex h-full flex-col overflow-y-auto overscroll-contain px-3 py-3 sm:px-5 sm:py-4 tiny:py-2 lg:px-12 lg:py-6 xl:px-16">
          <motion.div
            className="mx-auto my-auto w-full max-w-md lg:max-w-[26rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease }}
          >
            <div className="mb-4 hidden lg:block lg:tiny:hidden">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">Member access</p>
              <div className="mt-3 h-px w-14 bg-gradient-to-r from-gold via-gold-bright to-transparent" />
            </div>

            <div className="auth-card rounded-2xl bg-white p-4 ring-1 ring-sand shadow-[0_20px_50px_-28px_rgba(20,18,15,0.28)] sm:rounded-[1.75rem] sm:p-5 tiny:p-3.5 lg:p-6 xl:p-7">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-deep flat:hidden lg:hidden [@media(max-height:520px)]:hidden">Member access</p>

              <h1 className="mt-1 font-serif text-[1.65rem] leading-tight text-ink sm:mt-0 sm:text-[1.85rem] tiny:text-[1.45rem] lg:text-[2.15rem] xl:text-[2.35rem]">
                {title}
              </h1>
              {subtitle ? (
                <p className="auth-subtitle mt-1.5 text-xs leading-5 text-stone sm:text-sm sm:leading-6 max-lg:tiny:hidden flat:hidden">
                  {subtitle}
                </p>
              ) : null}

              <motion.ul
                className="mt-3 grid grid-cols-3 gap-1.5 sm:mt-4 sm:gap-2 short:hidden flat:hidden"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
                aria-label="What you unlock"
              >
                {PERKS.map((perk) => (
                  <motion.li
                    key={perk.title}
                    className="flex flex-col items-center rounded-xl bg-ivory/90 px-1.5 py-2 text-center ring-1 ring-sand/80 sm:rounded-2xl sm:py-2.5"
                    variants={{
                      hidden: { opacity: 0, y: 6 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                    }}
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest/8 text-forest ring-1 ring-forest/10 sm:h-9 sm:w-9">
                      <perk.icon size={15} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="mt-1 text-[9px] font-medium leading-tight text-ink sm:text-[10px]">
                      {perk.title}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="auth-form mt-4 sm:mt-5 tiny:mt-3">{children}</div>
              {footer ? (
                <div className="mt-4 border-t border-sand pt-4 text-xs text-stone sm:mt-5 sm:text-sm tiny:mt-2.5 tiny:pt-2.5">
                  {footer}
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
