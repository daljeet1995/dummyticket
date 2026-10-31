'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReviewBookingPage() {
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Get booking data from session storage
    const data = sessionStorage.getItem('bookingData');
    if (data) {
      try {
        setBookingData(JSON.parse(data));
      } catch (e) {
        console.error('Error parsing booking data', e);
      }
    }
  }, []);

  const handleProceed = () => {
    // Save booking data for payment page
    window.location.href = '/payment-options';
  };

  return (
    <>
      <Header />

      <style dangerouslySetInnerHTML={{
        __html: `
          .booking-wrapper {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 40px 20px;
            min-height: calc(100vh - 80px);
            background: #f0f4f9;
          }

          .booking-container {
            max-width: 1100px;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 380px;
            gap: 30px;
            margin: 0 auto;
          }

          .main-content {
            background: #fff;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          }

          .step-indicator {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 30px;
            justify-content: center;
            flex-wrap: wrap;
          }

          .step-indicator .step {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 600;
            color: #8896a8;
          }

          .step-indicator .step.active {
            color: #1a2332;
          }

          .step-indicator .step .num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #e8edf3;
            color: #8896a8;
            font-size: 12px;
            font-weight: 700;
          }

          .step-indicator .step.active .num {
            background: #ff6d00;
            color: #fff;
          }

          .step-indicator .step-line {
            width: 40px;
            height: 2px;
            background: #e8edf3;
          }

          .step-indicator .step-line.active {
            background: #ff6d00;
          }

          .booking-title {
            font-size: 28px;
            font-weight: 800;
            color: #1a2332;
            margin-bottom: 8px;
            text-align: center;
          }

          .booking-subtitle {
            color: #64748b;
            font-size: 14px;
            margin-bottom: 30px;
            text-align: center;
          }

          .review-section {
            border: 1px solid #eef2f6;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 20px;
          }

          .review-section .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #1a2332;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .review-section .section-title .edit-link {
            color: #ff6d00;
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
          }

          .review-section .section-title .edit-link:hover {
            text-decoration: underline;
          }

          .flight-details {
            background: #f8fafc;
            border-radius: 12px;
            padding: 16px 20px;
            margin-top: 8px;
          }

          .flight-details .route {
            font-weight: 700;
            font-size: 16px;
            color: #1a2332;
          }

          .flight-details .date {
            color: #64748b;
            font-size: 14px;
          }

          .passenger-item {
            padding: 6px 0;
            font-size: 14px;
            color: #1a2332;
          }

          .passenger-item .name {
            font-weight: 600;
          }

          .passenger-item .detail {
            color: #64748b;
            margin-left: 8px;
          }

          .contact-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .contact-details .item {
            font-size: 14px;
          }

          .contact-details .item .label {
            color: #64748b;
          }

          .contact-details .item .value {
            font-weight: 500;
            color: #1a2332;
          }

          .benefits-list {
            list-style: none;
            padding: 0;
            margin: 8px 0;
          }

          .benefits-list li {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 4px 0;
            font-size: 14px;
            color: #1a2332;
          }

          .benefits-list li i {
            color: #22c55e;
            font-size: 14px;
          }

          .sidebar {
            align-self: start;
          }

          .sidebar-card {
            background: #fff;
            border-radius: 24px;
            padding: 28px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.06);
            margin-bottom: 20px;
          }

          .sidebar-card .card-title {
            font-size: 16px;
            font-weight: 700;
            color: #1a2332;
            margin-bottom: 16px;
            text-align: center;
          }

          .sidebar-card .price {
            font-size: 32px;
            font-weight: 800;
            color: #1a2332;
            text-align: center;
          }

          .sidebar-card .price small {
            font-size: 14px;
            font-weight: 400;
            color: #64748b;
          }

          .sidebar-card .benefits {
            list-style: none;
            padding: 0;
            margin: 16px 0;
          }

          .sidebar-card .benefits li {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 0;
            font-size: 14px;
            color: #1a2332;
            border-bottom: 1px solid #f0f4f9;
          }

          .sidebar-card .benefits li:last-child {
            border-bottom: none;
          }

          .sidebar-card .benefits li i {
            color: #22c55e;
            font-size: 14px;
          }

          .proceed-btn {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #ff7b00, #ff9800);
            color: #fff;
            border: none;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: .3s;
            margin-top: 12px;
          }

          .proceed-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(255, 123, 0, 0.35);
          }

          .secure-badge {
            text-align: center;
            margin-top: 16px;
            font-size: 13px;
            color: #64748b;
          }

          .secure-badge i {
            color: #22c55e;
            margin-right: 6px;
          }

          .back-link {
            display: inline-block;
            margin-top: 16px;
            color: #64748b;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            transition: .3s;
          }

          .back-link:hover {
            color: #ff6d00;
          }

          @media(max-width: 900px) {
            .booking-container {
              grid-template-columns: 1fr;
              max-width: 600px;
            }
            .main-content {
              padding: 24px;
            }
            .contact-details {
              grid-template-columns: 1fr;
            }
          }
        `
      }} />

      <div className="booking-wrapper">
        <div className="booking-container">
          <div className="main-content">
            {/* Step Indicator */}
            <div className="step-indicator">
              <div className="step active">
                <span className="num">1</span> Search
              </div>
              <div className="step-line active"></div>
              <div className="step active">
                <span className="num">2</span> Details
              </div>
              <div className="step-line active"></div>
              <div className="step active">
                <span className="num">3</span> Review
              </div>
              <div className="step-line"></div>
              <div className="step">
                <span className="num">4</span> Payment
              </div>
            </div>

            <h1 className="booking-title">Review Booking</h1>
            <p className="booking-subtitle">FLIGHT BOOKING - STEP 3 OF 4</p>

            {/* Flight Details */}
            <div className="review-section">
              <div className="section-title">
                Flight Details
                <Link href="/passenger" className="edit-link">Edit</Link>
              </div>
              <div className="flight-details">
                <div className="route">
                  {bookingData?.flight ? 
                    `${bookingData.flight.origin} (${bookingData.flight.origin}) → ${bookingData.flight.destination} (${bookingData.flight.destination})` : 
                    'NEW DELHI (DEL) → London (YXU)'}
                </div>
                <div className="date">Departure: {bookingData?.flight?.departureTime || '2026-07-14'}</div>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="review-section">
              <div className="section-title">
                Passenger Details
                <Link href="/passenger" className="edit-link">Edit</Link>
              </div>
              {bookingData?.passengers?.map((p: any, index: number) => (
                <div className="passenger-item" key={index}>
                  <span className="name">{p.title} {p.firstName} {p.lastName}</span>
                  <span className="detail">DOB: {p.dob}</span>
                  <span className="detail">Nationality: {p.nationality}</span>
                </div>
              ))}
            </div>

            {/* Contact Details */}
            <div className="review-section">
              <div className="section-title">
                Contact Details
                <Link href="/passenger" className="edit-link">Edit</Link>
              </div>
              <div className="contact-details">
                <div className="item">
                  <span className="label">Email: </span>
                  <span className="value">{bookingData?.contact?.email || 'test@gmail.com'}</span>
                </div>
                <div className="item">
                  <span className="label">Phone: </span>
                  <span className="value">{bookingData?.contact?.phone || '9999777745'}</span>
                </div>
              </div>
            </div>

            {/* Package Benefits */}
            <div className="review-section">
              <div className="section-title">Package Benefits</div>
              <ul className="benefits-list">
                <li><i className="fas fa-check-circle"></i> Secure booking with instant confirmation</li>
                <li><i className="fas fa-check-circle"></i> Instant Booking Confirmation</li>
                <li><i className="fas fa-check-circle"></i> Visa Friendly Documents</li>
                <li><i className="fas fa-check-circle"></i> Priority Travel Support</li>
                <li><i className="fas fa-check-circle"></i> Secure Online Payment</li>
              </ul>
            </div>

            <Link href="/passenger" className="back-link">
              <i className="fas fa-arrow-left"></i> Back to Passenger Details
            </Link>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-card">
              <div className="card-title">Final Fare</div>
              <div className="price">₹{bookingData?.flight?.price || '599'} <small>inclusive of taxes & charges</small></div>

              <ul className="benefits">
                <li><i className="fas fa-check-circle"></i> Secure booking with instant confirmation</li>
                <li><i className="fas fa-check-circle"></i> Instant Booking Confirmation</li>
                <li><i className="fas fa-check-circle"></i> Visa, Embarkation, Documentation</li>
              </ul>
            </div>

            <button className="proceed-btn" onClick={handleProceed}>
              Proceed to Payment
            </button>

            <div className="secure-badge">
              <i className="fas fa-lock"></i> 100% Secure Checkout
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}