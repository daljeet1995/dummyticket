'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSiteNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="site-header">
      <Link className="site-brand" href="/" aria-label="DummyFlight Home">
        <img
          src="/uploads/logo/1779185741_170832771914716749091707118119%20(2).png"
          alt="DummyFlight Logo"
        />
      </Link>

      <button
        className="mobile-menu-btn"
        type="button"
        onClick={toggleSiteNav}
        aria-label="Open Menu"
      >
        ☰
      </button>

      <nav className={`site-nav ${isMenuOpen ? 'show' : ''}`} id="siteNav">
        <Link href="/">Home</Link>
        <Link href="/#services">Services</Link>
        <Link href="/#howItWorks">How it Works</Link>
        <Link href="/#faq">FAQ</Link>
        <Link href="/check-status" className="login-link">Login</Link>
      </nav>
    </header>
  );
}