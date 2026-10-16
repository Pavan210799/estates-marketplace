import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found");
  return (
    <Container className="py-24">
      <p className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">404</p>
      <h1 className="mt-3 font-serif text-5xl">This page is not on the map.</h1>
      <Link to="/" className="mt-6 inline-flex text-sm font-medium text-forest">
        Return home
      </Link>
    </Container>
  );
}
