import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CITY_GUIDES } from "../../data/content";
import Logo from "../brand/Logo";
import Container from "../ui/Container";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <footer className="mt-auto border-t border-sand bg-ink text-ivory">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0 lg:col-span-1">
          <Logo size="sm" variant="dark" showTagline={false} asLink={false} />
          <p className="mt-4 max-w-sm text-sm leading-6 text-ivory/75">
            Indian homes with advisors, detail pages, wishlist, compare, and owner submissions.
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-gold-bright">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>
              <Link to="/listings">Residences</Link>
            </li>
            <li>
              <Link to="/agents">Advisors</Link>
            </li>
            <li>
              <Link to="/wishlist">Saved homes</Link>
            </li>
            <li>
              <Link to="/compare">Compare</Link>
            </li>
            <li>
              <Link to="/submit">List a home</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-gold-bright">Account</p>
          {user ? (
            <div className="mt-4 text-sm">
              <p className="text-ivory">{user.name}</p>
              <p className="text-ivory/60">{user.email}</p>
              <button
                type="button"
                className="mt-3 text-ivory/80 underline-offset-4 transition-colors hover:text-gold-bright hover:underline"
                onClick={() => {
                  logout();
                  navigate("/login", { replace: true });
                }}
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-gold-bright">Cities</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-ivory/80">
            {CITY_GUIDES.slice(0, 8).map((guide) => (
              <li key={guide.city}>
                <Link to={`/listings?city=${encodeURIComponent(guide.city)}`}>{guide.city}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs leading-5 text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} Estates.in</p>
          <p>Sample listings · prices in INR</p>
        </Container>
      </div>
    </footer>
  );
}
