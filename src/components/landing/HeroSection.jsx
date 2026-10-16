import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { AGENTS } from "../../data/agents";
import { CITY_GUIDES } from "../../data/content";
import { heroImage } from "../../data/media";
import { easeOut } from "../../lib/motion";
import { formatPrice } from "../../lib/utils";
import Button from "../ui/Button";
import Container from "../ui/Container";
import CoverImage from "../ui/CoverImage";

const MotionLink = motion.create(Link);

const HEADLINE = "Indian homes worth staying in.".split(" ");

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: easeOut },
});

const DIGIT_REEL = Array.from({ length: 20 }, (_, index) => index % 10);
const settle = [0.16, 1, 0.3, 1];

function RollingNumber({ value, delay = 0 }) {
  const digits = String(value).split("");

  return (
    <>
      <span className="sr-only">{value}</span>
      <span className="inline-flex" aria-hidden="true">
        {digits.map((digit, index) => (
          <span
            key={`${index}-${digit}`}
            className="relative inline-block h-[1.2em] overflow-hidden leading-[1.2em]"
          >
            <span className="invisible">{digit}</span>
            <motion.span
              className="absolute inset-x-0 top-0 flex flex-col items-center"
              initial={{ y: "0%" }}
              animate={{ y: `-${(10 + Number(digit)) * 5}%` }}
              transition={{
                duration: 1.6 + (digits.length - 1 - index) * 0.25,
                delay,
                ease: settle,
              }}
            >
              {DIGIT_REEL.map((reelDigit, reelIndex) => (
                <span key={reelIndex} className="h-[1.2em]">
                  {reelDigit}
                </span>
              ))}
            </motion.span>
          </span>
        ))}
      </span>
    </>
  );
}

function Sheen() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-[translate,opacity] duration-700 ease-out group-hover/tile:translate-x-[300%] group-hover/tile:opacity-100"
    />
  );
}

export default function HeroSection({ properties, spotlight, cityCount }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const tilesY = useTransform(scrollYProgress, [0, 1], [0, 28]);

  const stats = [
    { label: "Homes", value: properties.length },
    { label: "Cities", value: cityCount },
    { label: "Advisors", value: AGENTS.length },
  ];

  const tiles = CITY_GUIDES.slice(0, 2);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-ink">
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: backdropY }}>
        <motion.div
          className="h-full w-full origin-center"
          initial={{ scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: easeOut }}
        >
          <motion.div
            className="h-full w-full origin-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          >
            <CoverImage src={heroImage} alt="" priority className="h-full w-full object-cover" />
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-gold/20 blur-[110px]"
          animate={{ x: [0, 90, 0], y: [0, -50, 0], opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-gold-bright/15 blur-[120px]"
          animate={{ x: [0, -70, 0], y: [0, 40, 0], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative z-10 grid min-h-[min(92vh,880px)] items-end gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
        <motion.div className="min-w-0 pb-4 lg:col-span-5 xl:col-span-4" style={{ y: copyY }}>
          <motion.p
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-gold-bright"
            {...rise(0.1)}
          >
            <motion.span
              aria-hidden="true"
              className="h-px w-10 origin-left bg-gradient-to-r from-gold-bright to-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: easeOut }}
            />
            Estates.in
          </motion.p>
          <h1
            className="mt-4 font-serif text-[2.5rem] leading-[1.02] text-ivory sm:text-6xl lg:text-[3.25rem]"
            aria-label={HEADLINE.join(" ")}
          >
            {HEADLINE.map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden="true">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", rotate: 4 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.25 + index * 0.08, ease: easeOut }}
                >
                  {word}
                </motion.span>
                {index < HEADLINE.length - 1 ? "\u00a0" : null}
              </span>
            ))}
          </h1>
          <motion.p className="mt-5 max-w-md text-base leading-7 text-ivory/80" {...rise(0.75)}>
            Curated apartments, villas, and houses — shown with real photography and city advisors
            who know the street.
          </motion.p>
          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" {...rise(0.9)}>
            <Button to="/listings" variant="gold" className="group/cta relative w-full overflow-hidden sm:w-auto">
              <span
                aria-hidden="true"
                className="hero-cta-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
              />
              <span className="relative">Explore residences</span>
              <ArrowRight size={16} className="relative transition-transform duration-200 group-hover/cta:translate-x-1" />
            </Button>
            <Button to="/agents" variant="light" className="w-full sm:w-auto">
              Meet advisors
            </Button>
          </motion.div>
          <motion.dl
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-ivory/20 pt-8"
            {...rise(1.05)}
          >
            {stats.map((stat, index) => (
              <div key={stat.label}>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-gold-bright">{stat.label}</dt>
                <dd className="mt-1 font-serif text-3xl leading-[1.2] text-ivory">
                  <RollingNumber value={stat.value} delay={1.1 + index * 0.12} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div className="min-w-0 lg:col-span-7 xl:col-span-8" style={{ y: tilesY }}>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {spotlight ? (
              <MotionLink
                to={`/property/${spotlight.id}`}
                className="group/tile relative aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-ivory/20 transition-[box-shadow,ring-color] duration-200 hover:shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)] hover:ring-gold-bright/50 sm:row-span-2 sm:aspect-auto sm:min-h-[420px]"
                initial={{ opacity: 0, y: 48, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.45, ease: easeOut }}
                whileHover={{ y: -6 }}
              >
                <CoverImage
                  src={spotlight.images[0]}
                  alt=""
                  fill
                  priority
                  className="object-cover transition-transform duration-200 ease-out motion-safe:group-hover/tile:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <Sheen />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold-bright">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-bright/70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-bright" />
                    </span>
                    Featured
                  </p>
                  <p className="mt-2 font-serif text-2xl text-ivory transition-colors duration-200 group-hover/tile:text-gold-bright">
                    {spotlight.title}
                  </p>
                  <p className="mt-3 font-serif text-3xl text-ivory">{formatPrice(spotlight)}</p>
                </div>
              </MotionLink>
            ) : null}
            {tiles.map((guide, index) => (
              <MotionLink
                key={guide.city}
                to={`/listings?city=${encodeURIComponent(guide.city)}`}
                className="group/tile relative aspect-[5/4] overflow-hidden rounded-[1.75rem] ring-1 ring-ivory/15 transition-[box-shadow,ring-color] duration-200 hover:shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)] hover:ring-gold-bright/50 sm:aspect-[3/2]"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.65 + index * 0.15, ease: easeOut }}
                whileHover={{ y: -6 }}
              >
                <CoverImage
                  src={properties.find((p) => p.city === guide.city)?.images?.[0]}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-200 ease-out motion-safe:group-hover/tile:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-ink/35 transition-colors duration-200 group-hover/tile:bg-ink/20" />
                <Sheen />
                <p className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 font-serif text-2xl text-ivory">
                  {guide.city}
                  <ArrowRight
                    size={18}
                    className="-translate-x-2 opacity-0 transition-[translate,opacity] duration-200 group-hover/tile:translate-x-0 group-hover/tile:opacity-100"
                    aria-hidden="true"
                  />
                </p>
              </MotionLink>
            ))}
          </div>
        </motion.div>
      </Container>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/50">Scroll</span>
        <span className="relative h-9 w-px overflow-hidden bg-ivory/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold-bright"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
