"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FiSearch, FiUser, FiLogOut, FiFilm, FiMenu, FiX } from "react-icons/fi";
import { MdLocalMovies } from "react-icons/md";

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 2) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  }

  const navLinks = [
    { href: "/movies", label: "Movies" },
    { href: "/tv", label: "TV Shows" },
    { href: "/watching", label: "Watching" },
    { href: "/watched", label: "Watched" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cinema-black/95 backdrop-blur-sm border-b border-cinema-gold/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <MdLocalMovies className="text-cinema-gold text-2xl" />
          <span className="font-cinzel text-cinema-gold font-bold text-lg hidden sm:block tracking-wider">
            CINEMATICA
          </span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-cinema-muted text-sm" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies & TV shows..."
              className="cinema-input w-full pl-9 pr-4 py-2 rounded-lg text-sm"
            />
          </div>
        </form>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-cinema-muted hover:text-cinema-gold transition-colors rounded font-cinzel tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User menu */}
        {session ? (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-cinema-charcoal transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-cinema-gold/20 border border-cinema-gold/40 flex items-center justify-center">
                <FiUser className="text-cinema-gold text-sm" />
              </div>
              <span className="hidden sm:block text-sm text-cinema-cream font-medium max-w-[100px] truncate">
                {session.user?.name}
              </span>
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-12 w-48 bg-cinema-charcoal border border-cinema-gold/20 rounded-lg shadow-card overflow-hidden">
                <div className="px-4 py-3 border-b border-cinema-gold/10">
                  <p className="text-xs text-cinema-muted">Signed in as</p>
                  <p className="text-sm text-cinema-cream truncate">{session.user?.email}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-cinema-dark transition-colors"
                >
                  <FiLogOut />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="btn-gold px-4 py-2 rounded-lg text-sm flex-shrink-0"
          >
            Sign In
          </Link>
        )}

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-cinema-muted hover:text-cinema-gold transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cinema-dark border-t border-cinema-gold/10 px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-cinema-muted hover:text-cinema-gold transition-colors font-cinzel tracking-wide text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
