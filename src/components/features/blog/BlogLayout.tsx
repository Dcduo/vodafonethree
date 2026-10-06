import { ReactNode, useState } from 'react';

import styles from './blog.module.css';
import footerLinks from './footer-links.json';

const navigation = [
  ['Phones and devices', '/mobile'],
  ['SIM Only', '/sim-only'],
  ['Broadband', '/broadband'],
  ['TV', '/tv'],
  ['Why Vodafone', '/why-vodafone'],
  ['Support', '/help'],
  ['New - Apple', '/iphone'],
];
const origin = 'https://www.vodafone.co.uk';

function Icon({ kind }: { kind: 'search' | 'account' | 'basket' }) {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      {kind === 'search' && (
        <>
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 6 6" />
        </>
      )}
      {kind === 'account' && (
        <>
          <circle cx="12" cy="7" r="4" />
          <path d="M4 22v-3a8 8 0 0 1 16 0v3" />
        </>
      )}
      {kind === 'basket' && (
        <>
          <path d="M2 3h3l3 13h11l3-9H6M8 20h1m8 0h1" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </>
      )}
    </svg>
  );
}

export function BlogLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#blog-main">
        Skip to main content
      </a>
      <header className={styles.siteHeader}>
        <div className={styles.utility}>
          <div className={styles.wide}>
            <div>
              <a href={origin}>Personal</a>
              <a href={`${origin}/business`}>Business</a>
            </div>
            <div>
              <a href="https://stores.vodafone.co.uk/search">Find a store</a>
              <a href={`${origin}/network/status-checker`}>Network Status Checker</a>
            </div>
          </div>
        </div>
        <div className={styles.mainNav}>
          <a href={origin} aria-label="Vodafone home">
            <img src="/assets/blog/vodafone-logo.svg" width="36" height="36" alt="Vodafone" />
          </a>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navigation.map(([label, path]) => (
              <a key={label} href={`${origin}${path}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className={styles.actions}>
            <a href={`${origin}/basket`} aria-label="Basket">
              <Icon kind="basket" />
            </a>
            <a href={`${origin}/search`} aria-label="Search Vodafone">
              <Icon kind="search" />
            </a>
            <a href="https://myaccount.vodafone.co.uk/" aria-label="My Vodafone account">
              <Icon kind="account" />
            </a>
            <button
              className={styles.menuToggle}
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="blog-mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        <nav
          id="blog-mobile-nav"
          className={styles.mobileNav}
          hidden={!menuOpen}
          aria-label="Mobile navigation"
        >
          {navigation.map(([label, path]) => (
            <a key={label} href={`${origin}${path}`}>
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main id="blog-main" tabIndex={-1}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.wide}>
          <div className={styles.footerBrand}>
            <a href={origin} aria-label="Vodafone home">
              <img
                src="/assets/blog/vodafone-footer-logo.svg"
                width="36"
                height="36"
                alt="Vodafone"
              />
            </a>
            <div className={styles.socials}>
              <a href="https://www.facebook.com/vodafoneUK">Facebook</a>
              <a href="https://www.instagram.com/vodafoneuk/">Instagram</a>
              <a href="https://www.youtube.com/user/VODAFONEUK">YouTube</a>
            </div>
          </div>
          <div className={styles.footerColumns}>
            {footerLinks.map(group => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.map(link => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.legalLinks}>
            <a href={`${origin}/terms-and-conditions`}>Terms and conditions</a>
            <a href={`${origin}/sitemap`}>Site map</a>
            <a href={`${origin}/privacy`}>Privacy policy</a>
            <a href={`${origin}/privacy/cookies`}>Cookie policy</a>
            <a href={`${origin}/help/account/accessibility`}>Accessibility</a>
          </div>
          <p className={styles.demoNote}>
            Demonstration site · Article content is managed in a separate Contentful test space.
            Navigation links open Vodafone’s website.
          </p>
        </div>
      </footer>
    </div>
  );
}
