import Link from "next/link";
import { Container } from "../components/container";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function Header() {
  const { isAuthenticated, logout, loginWithPopup } = useAuth0();
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로

  return (
    <header className="py-6">
      <Container>
        <nav className="flex items-center space-x-4">
          <img className="w-12 h-12" src="/zigzag_logo.png" alt="zigzag_logo" />
          <Link
            className={`${
              pathname === "/"
                ? "text-yellow-400"
                : "hover:text-yellow-400 transition-colors"
            }`}
            href="/"
          >
            홈
          </Link>
          <Link
            className={`${
              pathname === "/apply"
                ? "text-yellow-400"
                : "hover:text-yellow-400 transition-colors"
            }`}
            href="/apply"
          >
            신청하기
          </Link>
          <Link
            className={`${
              pathname === "/profile"
                ? "text-yellow-400"
                : "hover:text-yellow-400 transition-colors"
            }`}
            href="/profile"
          >
            마이페이지
          </Link>
          <Link
            className={`${
              pathname === "/applications"
                ? "text-yellow-400"
                : "hover:text-yellow-400 transition-colors"
            }`}
            href="/applications"
          >
            신청서목록
          </Link>
          {isAuthenticated ? (
            <button
              type="button"
              className="hover:text-yellow-400 transition-colors"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              로그아웃
            </button>
          ) : (
            <button
              type="button"
              className="hover:text-yellow-400 transition-colors"
              onClick={() =>
                loginWithPopup().then((reslove) => {
                  router.push("/login");
                })
              }
            >
              로그인
            </button>
          )}
        </nav>
      </Container>
    </header>
  );
}
