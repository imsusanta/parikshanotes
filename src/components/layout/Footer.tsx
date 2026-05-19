import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/shop', label: 'All Notes' },
    { href: '/shop?category=SSC', label: 'SSC Notes' },
    { href: '/shop?category=UPSC', label: 'UPSC Notes' },
    { href: '/shop?category=Railway', label: 'Railway Notes' },
    { href: '/shop?category=Banking', label: 'Banking Notes' },
  ];

  const supportLinks = [
    { href: '/track-order', label: 'Track Order' },
    { href: '#about', label: 'About Us' },
    { href: 'mailto:contact@pariksha notes.com', label: 'Contact' },
  ];

  return (
    <footer className="bg-ink-light border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold font-[family-name:var(--font-display)] text-saffron">
                Pariksha
              </span>
              <span className="text-2xl font-light text-chalk">Notes</span>
            </Link>
            <p className="text-sm text-chalk-muted leading-relaxed max-w-xs">
              Padhlo. Paaso. Prove Karo. — India ka sabse trusted notes platform for government job aspirants.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Telegram" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-saffron/20 flex items-center justify-center text-chalk-dim hover:text-saffron transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 1 0 24 12.056A12.01 12.01 0 0 0 11.944 0Zm4.962 7.166c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635Z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-saffron/20 flex items-center justify-center text-chalk-dim hover:text-saffron transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-saffron/20 flex items-center justify-center text-chalk-dim hover:text-saffron transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-chalk uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-chalk-muted hover:text-saffron transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-chalk uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-chalk-muted hover:text-saffron transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-chalk uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-2.5">
              <p className="text-sm text-chalk-muted">
                📧 contact@pariksha notes.com
              </p>
              <p className="text-sm text-chalk-muted">
                📱 Join our Telegram channel for updates
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-chalk-muted">
            © {currentYear} ParikshaNotes. All rights reserved.
          </p>
          <p className="text-xs text-chalk-muted font-[family-name:var(--font-display)] italic">
            &ldquo;Padhlo. Paaso. Prove Karo.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
