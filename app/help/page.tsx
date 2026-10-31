'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HelpPage() {
  return (
    <>
      <Header />
      
      {/* Main Content */}
      <main className="policy-page-wrap">
        <section className="policy-card">
          <h1>Help Center</h1>

          <div className="policy-content">
            <h3 className="policy-heading">Help Center</h3>
            <p>
              For booking support, payment issues, document delivery, or any
              clarification, please contact our support team.
            </p>
            <p>
              Our team will assist you with dummy flight tickets, hotel
              reservations, invoices and payment-related queries.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}