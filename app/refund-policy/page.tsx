'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      
      <main className="policy-page-wrap">
        <section className="policy-card">
          <h1>Refund Policy</h1>

          <div className="policy-content">
            <h3 className="policy-heading">Refund Policy</h3>
            <p>
              Refund eligibility depends on the service status and whether the
              requested document has already been processed or delivered.
            </p>
            <p>
              If a refund is approved, it will be processed as per the original
              payment mode and applicable payment gateway timelines.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}