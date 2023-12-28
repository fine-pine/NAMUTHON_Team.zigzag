import Link from "next/link";
import Container from "../components/container";

export default function Header() {
  return (
    <header className="py-6">
      <Container>
        <nav className="flex space-x-4">
          <Link className="hover:text-yellow-400 transition-colors" href="/">
            About
          </Link>
          <Link
            className="hover:text-yellow-400 transition-colors"
            href="/apply"
          >
            Apply
          </Link>
          <Link
            className="hover:text-yellow-400 transition-colors"
            href="/applications"
          >
            Applications
          </Link>
        </nav>
      </Container>
    </header>
  );
}
