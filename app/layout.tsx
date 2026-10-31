import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dummy Ticket - Book Dummy Flight & Hotel Reservations",
  description: "Book dummy flight tickets and hotel reservations for visa applications. Fast delivery in 30-60 minutes.",
  keywords: "dummy ticket, flight reservation, hotel booking, visa document",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/stylebcbf.css?v=1783498763" />
        <link rel="stylesheet" href="/css/common-headerbcbf.css?v=1783498763" />
        <link rel="stylesheet" href="/css/common-footerbcbf.css?v=1783498763" />
        <link rel="stylesheet" href="/css/policy-pagesbcbf.css?v=1783498763" />
        
        {/* Theme Settings */}
        <style id="theme-settings-css" dangerouslySetInnerHTML={{
          __html: `
            :root {
              --theme-body-bg-color: #eef4ff;
              --theme-card-bg-color: #ffffff;
              --theme-heading-color: #002b64;
              --theme-text-color: #64748b;
              --theme-hero-primary-color: #003580;
              --theme-hero-secondary-color: #0052cc;
              --theme-hero-text-color: #ffffff;
              --theme-hero-badge-text-color: #ffffff;
              --theme-hero-badge-bg-color: #2f67ae;
              --theme-hero-badge-border-color: #6ea8ff;
              --theme-search-button-color: #ff6d00;
              --theme-search-button-hover-color: #ffc574;
              --theme-search-button-text-color: #ffffff;
              --theme-search-card-border-color: #ff6d00;
              --theme-active-tab-color: #ff6d00;
              --theme-active-tab-hover-color: #fbc574;
              --theme-active-tab-text-color: #ffffff;
              --theme-inactive-tab-text-color: #172033;
              --theme-inactive-tab-bg-color: #eef4ff;
              --theme-trip-pill-color: #e3f3f7;
              --theme-trip-pill-text-color: #000000;
              --theme-trip-pill-inactive-text-color: #172033;
              --theme-trip-pill-inactive-bg-color: #ffffff;
              --theme-field-border-color: #d7e3f4;
              --theme-field-text-color: #172033;
              --theme-login-button-color: #ff6d00;
              --theme-login-button-hover-color: #ff9800;
              --theme-login-button-text-color: #ffffff;
              --theme-section-badge-color: #ff6d00;
              --theme-section-badge-bg-color: #fff2e6;
              --theme-process-card-corner-color: #ffffff;
              --theme-process-number-text-color: #ff9800;
              --theme-process-card-title-color: #003580;
              --theme-process-card-text-color: #64748b;
              --theme-footer-primary-color: #003580;
              --theme-footer-secondary-color: #0052cc;
              --theme-footer-text-color: #ffffff;
              --theme-footer-link-color: #dbeafe;
              --theme-header-bg-color: #ffffff;
              --theme-header-menu-color: #172033;
              --theme-header-menu-hover-color: #ff6d00;
              --theme-header-sticky-bg-color: #ffffff;
              --theme-logo-text-color: #003580;
              --theme-hero-heading-size: 56px;
              --theme-hero-subheading-size: 20px;
              --theme-hero-overlay-opacity: 0.35;
              --theme-hero-button-radius: 18px;
              --theme-search-card-bg-color: #ffffff;
              --theme-search-card-shadow-color: #dbeafe;
              --theme-search-input-bg-color: #ffffff;
              --theme-search-input-hover-color: #f8fbff;
              --theme-search-icon-color: #0052cc;
              --theme-search-border-radius: 34px;
              --theme-services-bg-color: #eef4ff;
              --theme-trust-bg-color: #ffffff;
              --theme-plans-bg-color: #eef4ff;
              --theme-howitworks-bg-color: #ffffff;
              --theme-airlines-bg-color: #eef4ff;
              --theme-preview-bg-color: #ffffff;
              --theme-testimonial-bg-color: #eef4ff;
              --theme-faq-bg-color: #eef4ff;
              --theme-faq-heading-color: #003580;
              --theme-faq-question-color: #172033;
              --theme-faq-answer-color: #64748b;
              --theme-faq-card-bg-color: #ffffff;
              --theme-faq-card-border-color: #d7e3f4;
              --theme-faq-icon-bg-color: #eef7ff;
              --theme-faq-icon-color: #ff6d00;
              --theme-faq-plus-color: #003580;
              --theme-faq-active-bg-color: #003580;
              --theme-secondary-button-color: #eef4ff;
              --theme-secondary-button-hover-color: #dbeafe;
              --theme-secondary-button-text-color: #003580;
              --theme-button-radius: 18px;
              --theme-card-border-color: #d7e3f4;
              --theme-card-shadow-color: #e5edf8;
              --theme-card-hover-border-color: #b8d3ff;
              --theme-card-radius: 24px;
              --theme-footer-heading-color: #ffffff;
              --theme-footer-icon-color: #ffffff;
              --theme-footer-border-color: #2f67ae;
              --theme-footer-copyright-color: #dbeafe;
            }

            body {
              background: var(--theme-body-bg-color) !important;
              color: var(--theme-text-color) !important;
            }

            header,
            .topbar,
            .site-header,
            .main-header {
              background: var(--theme-header-bg-color) !important;
            }

            .nav a,
            header a {
              color: var(--theme-header-menu-color) !important;
            }

            .nav a:hover,
            header a:hover {
              color: var(--theme-header-menu-hover-color) !important;
            }

            .login-btn,
            .header-login,
            .nav-login,
            .nav a[href*="login"],
            header a[href*="login"] {
              background: linear-gradient(
                90deg,
                var(--theme-login-button-color),
                var(--theme-login-button-hover-color)
              ) !important;
              color: var(--theme-login-button-text-color) !important;
              border-radius: var(--theme-button-radius) !important;
            }

            .hero,
            .hero-section {
              background: linear-gradient(
                135deg,
                var(--theme-hero-primary-color),
                var(--theme-hero-secondary-color)
              ) !important;
              color: var(--theme-hero-text-color) !important;
            }

            .hero h1,
            .hero-section h1 {
              color: var(--theme-hero-text-color) !important;
              font-size: var(--theme-hero-heading-size) !important;
            }

            .hero p,
            .hero-section p {
              color: var(--theme-hero-text-color) !important;
              font-size: var(--theme-hero-subheading-size) !important;
            }

            .hero .trust-row span,
            .hero .enhanced-trust-row span,
            .hero .hero-badges span {
              color: var(--theme-hero-badge-text-color) !important;
              background: var(--theme-hero-badge-bg-color) !important;
              border-color: var(--theme-hero-badge-border-color) !important;
              border-radius: var(--theme-hero-button-radius) !important;
            }

            h1,
            h2,
            h3,
            .section-heading h2,
            .enhanced-heading h2 {
              color: var(--theme-heading-color) !important;
            }

            p,
            .section-heading p,
            .enhanced-heading p {
              color: var(--theme-text-color) !important;
            }

            .section-heading > span,
            .enhanced-heading > span,
            .section-badge {
              color: var(--theme-section-badge-color) !important;
              background: var(--theme-section-badge-bg-color) !important;
            }

            .search-card,
            .booking-card,
            .search-box,
            .booking-box,
            .search-section {
              background: var(--theme-search-card-bg-color) !important;
              border-color: var(--theme-search-card-border-color) !important;
              border-radius: var(--theme-search-border-radius) !important;
              box-shadow: 0 24px 70px var(--theme-search-card-shadow-color) !important;
            }

            .field-card,
            .autocomplete-box {
              background: var(--theme-search-input-bg-color) !important;
              border-color: var(--theme-field-border-color) !important;
            }

            .field-card:hover,
            .field-card:focus-within {
              background: var(--theme-search-input-hover-color) !important;
            }

            .field-card input,
            .field-card select,
            .field-card textarea {
              color: var(--theme-field-text-color) !important;
            }

            .search-btn,
            .search-submit,
            .proceed-btn,
            .btn-search {
              background: linear-gradient(
                90deg,
                var(--theme-search-button-color),
                var(--theme-search-button-hover-color)
              ) !important;
              color: var(--theme-search-button-text-color) !important;
              border-radius: var(--theme-button-radius) !important;
            }

            .booking-tab,
            .service-tab,
            .type-tab {
              background: var(--theme-inactive-tab-bg-color) !important;
              color: var(--theme-inactive-tab-text-color) !important;
            }

            .booking-tab.active,
            .service-tab.active,
            .type-tab.active {
              background: linear-gradient(
                90deg,
                var(--theme-active-tab-color),
                var(--theme-active-tab-hover-color)
              ) !important;
              color: var(--theme-active-tab-text-color) !important;
            }

            .trip-pill,
            .trip-type,
            .radio-pill,
            .pill {
              background: var(--theme-trip-pill-inactive-bg-color) !important;
              color: var(--theme-trip-pill-inactive-text-color) !important;
            }

            .trip-pill.active,
            .trip-type.active,
            .radio-pill.active,
            .pill.active,
            .trip-pill:has(input:checked) {
              background: var(--theme-trip-pill-color) !important;
              color: var(--theme-trip-pill-text-color) !important;
            }

            .info-card,
            .why-card,
            .plan-card,
            .testimonial,
            .step,
            .process-card,
            .metric-card,
            .parallel-card,
            .work-card {
              background: var(--theme-card-bg-color) !important;
              border-color: var(--theme-card-border-color) !important;
              border-radius: var(--theme-card-radius) !important;
              box-shadow: 0 18px 46px var(--theme-card-shadow-color) !important;
            }

            .info-card:hover,
            .why-card:hover,
            .plan-card:hover,
            .testimonial:hover,
            .step:hover,
            .process-card:hover {
              border-color: var(--theme-card-hover-border-color) !important;
            }

            #services,
            .services-section {
              background: var(--theme-services-bg-color) !important;
            }

            #trust,
            .trust-section,
            .why-section {
              background: var(--theme-trust-bg-color) !important;
            }

            #plans,
            .plans-section {
              background: var(--theme-plans-bg-color) !important;
            }

            #howItWorks,
            .booking-process-section,
            .how-it-works-section {
              background: var(--theme-howitworks-bg-color) !important;
            }

            #airlines,
            .airlines-section {
              background: var(--theme-airlines-bg-color) !important;
            }

            #testimonials,
            .testimonials-section {
              background: var(--theme-testimonial-bg-color) !important;
            }

            #faq,
            .faq-luxury-section,
            .faq-modern-section {
              background: var(--theme-faq-bg-color) !important;
            }

            .booking-process-grid .process-no {
              background: var(--theme-process-card-corner-color) !important;
              color: var(--theme-process-number-text-color) !important;
            }

            .booking-process-grid .process-card h3 {
              color: var(--theme-process-card-title-color) !important;
            }

            .booking-process-grid .process-card p {
              color: var(--theme-process-card-text-color) !important;
            }

            .faq-luxury-heading h2,
            .faq-modern-section h2 {
              color: var(--theme-faq-heading-color) !important;
            }

            .faq-luxury-question strong,
            .faq-modern-item h3 {
              color: var(--theme-faq-question-color) !important;
            }

            .faq-luxury-answer,
            .faq-modern-answer {
              color: var(--theme-faq-answer-color) !important;
            }

            .faq-luxury-item,
            .faq-modern-item {
              background: var(--theme-faq-card-bg-color) !important;
              border-color: var(--theme-faq-card-border-color) !important;
            }

            .faq-number,
            .faq-check {
              background: var(--theme-faq-icon-bg-color) !important;
              color: var(--theme-faq-icon-color) !important;
            }

            .faq-luxury-question i,
            .faq-modern-item:after {
              color: var(--theme-faq-plus-color) !important;
            }

            .site-footer,
            footer {
              background: linear-gradient(
                135deg,
                var(--theme-footer-primary-color),
                var(--theme-footer-secondary-color)
              ) !important;
              color: var(--theme-footer-text-color) !important;
              border-color: var(--theme-footer-border-color) !important;
            }

            .site-footer h4,
            footer h4 {
              color: var(--theme-footer-heading-color) !important;
            }

            .site-footer a,
            footer a {
              color: var(--theme-footer-link-color) !important;
            }

            .footer-bottom,
            .site-footer .footer-bottom {
              color: var(--theme-footer-copyright-color) !important;
            }

            /* Trust / Our Work first card must stay premium blue */
            #trust .work-card:first-child,
            #trust .why-card:first-child,
            #trust .parallel-card:first-child,
            #trust .trust-card:first-child,
            .trust-section .work-card:first-child,
            .trust-section .why-card:first-child,
            .trust-section .parallel-card:first-child,
            .trust-section .trust-card:first-child,
            .why-section .work-card:first-child,
            .why-section .why-card:first-child,
            .why-section .parallel-card:first-child,
            .why-section .trust-card:first-child {
              background:
                radial-gradient(
                  circle at 88% 88%,
                  rgba(255, 255, 255, 0.16),
                  transparent 0 18%,
                  transparent 19%
                ),
                linear-gradient(
                  145deg,
                  var(--theme-hero-primary-color),
                  var(--theme-hero-secondary-color)
                ) !important;
              color: #ffffff !important;
              border-color: rgba(255, 255, 255, 0.16) !important;
              box-shadow: 0 30px 80px rgba(0, 53, 128, 0.24) !important;
            }

            #trust .work-card:first-child *,
            #trust .why-card:first-child *,
            #trust .parallel-card:first-child *,
            #trust .trust-card:first-child *,
            .trust-section .work-card:first-child *,
            .trust-section .why-card:first-child *,
            .trust-section .parallel-card:first-child *,
            .trust-section .trust-card:first-child *,
            .why-section .work-card:first-child *,
            .why-section .why-card:first-child *,
            .why-section .parallel-card:first-child *,
            .why-section .trust-card:first-child * {
              color: #ffffff !important;
            }

            #trust .work-card:first-child .card-number,
            #trust .why-card:first-child .card-number,
            #trust .parallel-card:first-child .card-number,
            #trust .trust-card:first-child .card-number,
            #trust .work-card:first-child .number,
            #trust .why-card:first-child .number,
            #trust .parallel-card:first-child .number,
            #trust .trust-card:first-child .number,
            #trust .work-card:first-child .stat-number,
            #trust .why-card:first-child .stat-number {
              color: #ffb45c !important;
            }

            #trust .work-card:first-child .rating-box,
            #trust .why-card:first-child .rating-box,
            #trust .parallel-card:first-child .rating-box,
            #trust .trust-card:first-child .rating-box,
            #trust .work-card:first-child .review-box,
            #trust .why-card:first-child .review-box,
            #trust .parallel-card:first-child .review-box,
            #trust .trust-card:first-child .review-box {
              background: rgba(255, 255, 255, 0.12) !important;
              border: 1px solid rgba(255, 255, 255, 0.22) !important;
              color: #ffffff !important;
            }

            #trust .work-card:first-child .rating-box b,
            #trust .why-card:first-child .rating-box b,
            #trust .parallel-card:first-child .rating-box b,
            #trust .trust-card:first-child .rating-box b,
            #trust .work-card:first-child .review-box b,
            #trust .why-card:first-child .review-box b {
              color: #ffb45c !important;
            }
          `
        }} />
        <style id="theme-builder-css"></style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}