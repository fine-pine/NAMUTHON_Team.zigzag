import Link from "next/link";
import { Container } from "../components/container";

export default function Header() {
  return (
    <header className="py-6">
      <Container>
        <nav className="flex items-center space-x-4">
          <img className="w-12 h-12" src="/zigzag_logo.png" alt="zigzag_logo" />
          <Link className="hover:text-yellow-400 transition-colors" href="/">
            홈
          </Link>
          <Link
            className="hover:text-yellow-400 transition-colors"
            href="/apply"
          >
            신청하기
          </Link>
          <Link
            className="hover:text-yellow-400 transition-colors"
            href="/profile"
          >
            마이페이지
          </Link>
          <Link
            className="hover:text-yellow-400 transition-colors"
            href="/applications"
          >
            신청서목록
          </Link>
        </nav>
      </Container>
    </header>
  );
}
