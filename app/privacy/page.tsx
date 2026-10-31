'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      
      <main className="policy-page-wrap">
        <section className="policy-card">
          <h1>Privacy Policy</h1>

          <div className="policy-content">
            <h3 className="policy-heading">Privacy Policy</h3>
            <p>
              Dummyticket.tsbizz.com uses the information collected for service
              processing, booking support, payment confirmation and customer
              communication.
            </p>
            <p>
              We do not sell your personal information. Your details are used only
              for providing the requested service and related support.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}