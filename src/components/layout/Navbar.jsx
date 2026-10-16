import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, GitCompare, Heart, LogOut, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMarketplace } from "../../context/MarketplaceContext";
import { cn } from "../../lib/utils";
import Logo from "../brand/Logo";
import Container from "../ui/Container";

const links = [
  { to: "/listings", label: "Residences" },
  { to: "/agents", label: "Advisors" },
  { to: "/submit", label: "List a home" },
];

const ease = [0.22, 1, 0.36, 1];

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function Avatar({ name, className }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-bright to-gold-deep font-medium text-ink",
        className,
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}

function UserMenu({ user, onSignOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function onDocument(event) {
      if (!ref.current?.contains(event.target)) setOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onDocument);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDocument);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="btn-fx flex items-center gap-2.5 rounded-full bg-white py-1 pl-1 pr-3 ring-1 ring-sand"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <Avatar name={user.name} className="h-9 w-9 text-sm ring-2 ring-white" />
        <span className="max-w-[9rem] text-left leading-tight">
          <span className="block truncate text-sm font-medium text-ink">{user.name}</span>
          <span className="block truncate text-[11px] text-stone">{user.email}</span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} className="text-stone" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            className="absolute right-0 top-[calc(100%+0.6rem)] w-72 origin-top-right overflow-hidden rounded-3xl bg-white p-2 shadow-2xl shadow-ink/15 ring-1 ring-sand"
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6, transition: { duration: 0.15 } }}
            transition={{ duration: 0.28, ease }}
          >
            <div className="flex items-center gap-3 rounded-2xl bg-ivory p-3">
              <Avatar name={user.name} className="h-11 w-11" />
              <div className="min-w-0">
                <p className="truncate font-serif text-xl leading-tight">{user.name}</p>
                <p className="truncate text-xs text-stone">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              role="menuitem"
              className="btn-fx mt-2 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm text-danger transition-colors hover:bg-danger/5"
              onClick={() => {
                setOpen(false);
                onSignOut();
              }}
            >
              <LogOut size={16} />
              Sign out
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationKey = `${location.pathname}${location.search}`;
  const [menuKey, setMenuKey] = useState(null);
  const open = menuKey === locationKey;
  const { user, logout } = useAuth();
  const { wishlist, compare } = useMarketplace();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function signOut() {
    setMenuKey(null);
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-[80] w-full max-w-[100vw] self-start border-b border-sand/80 bg-ivory/92 backdrop-blur-md supports-[backdrop-filter]:bg-ivory/85">
      <Container className="flex h-[4.5rem] items-center justify-between gap-3">
        <Logo size="md" />

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "group/nav relative py-2 text-sm transition-colors hover:text-forest",
                  isActive ? "font-medium text-forest" : "text-stone",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {!isActive ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gold/80 transition-transform duration-200 ease-out group-hover/nav:scale-x-100"
                    />
                  ) : (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/wishlist" className="icon-btn relative h-10 w-10 rounded-full p-0" aria-label="Wishlist">
            <Heart size={17} />
            <AnimatePresence>
              {wishlist.length ? (
                <motion.span
                  key={wishlist.length}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-forest px-1 text-[10px] text-ivory"
                >
                  {wishlist.length}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </Link>
          <Link to="/compare" className="icon-btn relative h-10 w-10 rounded-full p-0" aria-label="Compare">
            <GitCompare size={17} />
            <AnimatePresence>
              {compare.length ? (
                <motion.span
                  key={compare.length}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] text-ink"
                >
                  {compare.length}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </Link>
          {user ? <UserMenu user={user} onSignOut={signOut} /> : null}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {user ? <Avatar name={user.name} className="h-9 w-9 text-sm" /> : null}
          <button
            type="button"
            className="icon-btn h-11 w-11 rounded-full p-0"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setMenuKey(open ? null : locationKey)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="grid place-items-center"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </Container>

      {createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div
              className="fixed inset-x-0 top-[4.5rem] z-[60] h-[calc(100dvh-4.5rem)] overflow-y-auto bg-ivory lg:hidden"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease }}
            >
              <Container className="flex flex-col gap-1 py-4">
                {user ? (
                  <div className="mb-3 flex items-center gap-3 rounded-3xl bg-white p-4 ring-1 ring-sand">
                    <Avatar name={user.name} className="h-12 w-12" />
                    <div className="min-w-0">
                      <p className="truncate font-serif text-2xl leading-tight">{user.name}</p>
                      <p className="truncate text-sm text-stone">{user.email}</p>
                    </div>
                  </div>
                ) : null}
                {[
                  ...links,
                  { to: "/wishlist", label: `Saved (${wishlist.length})` },
                  { to: "/compare", label: `Compare (${compare.length})` },
                ].map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.3, ease }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        cn("block border-b border-sand py-4 text-lg", isActive && "text-forest")
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                {user ? (
                  <button
                    type="button"
                    className="btn-fx mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-white text-danger ring-1 ring-sand"
                    onClick={signOut}
                  >
                    <LogOut size={17} />
                    Sign out
                  </button>
                ) : null}
              </Container>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  );
}
