import Link from "next/link";
import { Container } from "../components/container";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { isAuthenticated, logout, loginWithPopup } = useAuth0();

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
          {isAuthenticated ? (
            <button
              type="button"
              className="hover:text-yellow-400 transition-colors"
              onClick={() => logout()}
            >
              로그아웃
            </button>
          ) : (
            <button
              type="button"
              className="hover:text-yellow-400 transition-colors"
              onClick={() => loginWithPopup()}
            >
              로그인
            </button>
          )}
        </nav>
      </Container>
    </header>
  );
}
