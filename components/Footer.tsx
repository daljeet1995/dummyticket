import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-bg"></div>

      <div className="site-footer-inner">
        <div className="footer-brand-box">
          <div className="footer-logo-wrap">
            <img
              src="/uploads/logo/1779185741_170832771914716749091707118119%20(2).png"
              alt="Website Logo"
            />
          </div>

          <p style={{ color: 'var(--theme-footer-link-color) !important' }}>
            Professional dummy flight ticket and hotel reservation support for
            visa files.
          </p>

          <div className="footer-trust">
            <span>Secure Payment</span>
            <span>Fast Delivery</span>
            <span>PDF Format</span>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#faq">FAQ</Link>
          </div>

          <div className="footer-col">
            <h4>Policies</h4>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <Link href="/help">Help Center</Link>
            <a href="https://wa.me/918285697039" target="_blank" rel="noopener noreferrer">
              WhatsApp Support
            </a>
          </div>

          <div className="footer-col contact-col">
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <span>Email: corporate@tsbizz.com</span>
            </div>
            <div className="footer-contact-item">
              <span>Phone: +91 88003 37447</span>
            </div>
            <div className="footer-contact-item">
              <span>WhatsApp: +918800337447</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 Dummy Ticket. All rights reserved.</div>
        <div className="footer-bottom-links">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/refund-policy">Refund</Link>
        </div>
      </div>
    </footer>
  );
}