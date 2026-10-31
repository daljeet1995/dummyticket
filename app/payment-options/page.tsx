'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PaymentOptionsPage() {
  const [bookingData, setBookingData] = useState<any>(null);
  const [showQR, setShowQR] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [upiId] = useState(process.env.UPI_ID || 'your-upi-id@paytm');

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

  const generateUPIString = () => {
    const amount = bookingData?.flight?.price || '599';
    const payeeName = 'DummyFlight';
    const transactionNote = 'Flight Reservation Payment';
    
    return `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
  };

  const handlePayment = () => {
    setShowQR(true);
    setPaymentStatus('processing');
    
    // Simulate payment confirmation (replace with actual webhook/callback)
    setTimeout(() => {
      setPaymentStatus('completed');
      // Save booking confirmation
      const confirmedBooking = {
        ...bookingData,
        status: 'confirmed',
        bookingId: 'BK' + Date.now().toString().slice(-8),
        paymentDate: new Date().toISOString(),
      };
      sessionStorage.setItem('confirmedBooking', JSON.stringify(confirmedBooking));
    }, 30000);
  };

  const getStatusBadge = () => {
    switch(paymentStatus) {
      case 'pending':
        return <span className="status-badge pending">Pending</span>;
      case 'processing':
        return <span className="status-badge processing">Processing</span>;
      case 'completed':
        return <span className="status-badge completed">Confirmed</span>;
      case 'failed':
        return <span className="status-badge failed">Failed</span>;
      default:
        return null;
    }
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

          .payment-methods {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 30px;
          }

          .payment-method {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 16px 20px;
            border: 2px solid #eef2f6;
            border-radius: 14px;
            cursor: pointer;
            transition: .3s;
          }

          .payment-method:hover {
            border-color: #dce2ea;
          }

          .payment-method.selected {
            border-color: #ff6d00;
            background: #fff7f0;
          }

          .payment-method input[type="radio"] {
            accent-color: #ff6d00;
            width: 18px;
            height: 18px;
            cursor: pointer;
          }

          .payment-method .method-icon {
            font-size: 24px;
            width: 40px;
            text-align: center;
          }

          .payment-method .method-name {
            font-weight: 600;
            font-size: 15px;
            color: #1a2332;
          }

          .payment-method .method-desc {
            font-size: 13px;
            color: #64748b;
          }

          .upi-section {
            text-align: center;
            padding: 20px 0;
          }

          .qr-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding: 30px;
            background: #f8fafc;
            border-radius: 16px;
            border: 2px dashed #dce2ea;
          }

          .qr-container .qr-code {
            width: 250px;
            height: 250px;
            background: #fff;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #eef2f6;
          }

          .qr-container .qr-code img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .qr-container .upi-details {
            font-size: 14px;
            color: #64748b;
          }

          .qr-container .upi-details strong {
            color: #1a2332;
          }

          .pay-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #ff7b00, #ff9800);
            color: #fff;
            border: none;
            border-radius: 14px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: .3s;
            margin-top: 12px;
          }

          .pay-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(255, 123, 0, 0.35);
          }

          .pay-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }

          .payment-status {
            padding: 16px;
            border-radius: 12px;
            text-align: center;
            font-weight: 600;
            margin-top: 16px;
          }

          .payment-status.processing {
            background: #fef3c7;
            color: #92400e;
          }

          .payment-status.completed {
            background: #d1fae5;
            color: #065f46;
          }

          .payment-status.failed {
            background: #fee2e2;
            color: #991b1b;
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

          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
          }

          .status-badge.pending {
            background: #fef3c7;
            color: #92400e;
          }

          .status-badge.processing {
            background: #fef3c7;
            color: #92400e;
          }

          .status-badge.completed {
            background: #d1fae5;
            color: #065f46;
          }

          .status-badge.failed {
            background: #fee2e2;
            color: #991b1b;
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
            .qr-container .qr-code {
              width: 180px;
              height: 180px;
            }
          }

          @media(max-width: 480px) {
            .main-content {
              padding: 16px;
            }
            .payment-method {
              padding: 12px 16px;
            }
            .sidebar-card {
              padding: 20px;
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
              <div className="step-line active"></div>
              <div className="step active">
                <span className="num">4</span> Payment
              </div>
            </div>

            <h1 className="booking-title">Payment Options</h1>
            <p className="booking-subtitle">FLIGHT BOOKING - STEP 4 OF 4</p>

            {/* Payment Methods - Only UPI */}
            <div className="payment-methods">
              <div className="payment-method selected">
                <input type="radio" name="payment" value="upi" checked readOnly />
                <div className="method-icon">📱</div>
                <div>
                  <div className="method-name">Pay with UPI QR Code</div>
                  <div className="method-desc">Scan QR code with any UPI app (Google Pay, PhonePe, Paytm, BHIM)</div>
                </div>
              </div>
            </div>

            {/* UPI QR Code Section */}
            <div className="upi-section">
              {!showQR ? (
                <div className="qr-container">
                  <div className="upi-details">
                    <p><strong>Pay ₹{bookingData?.flight?.price || '599'}</strong> via UPI</p>
                    <p style={{ marginTop: '8px', fontSize: '13px' }}>
                      Click the button below to generate QR code
                    </p>
                  </div>
                  <button className="pay-btn" onClick={handlePayment}>
                    <i className="fas fa-qrcode"></i> Generate QR Code
                  </button>
                </div>
              ) : (
                <div className="qr-container">
                  <div className="qr-code">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(generateUPIString())}`}
                      alt="UPI QR Code"
                    />
                  </div>
                  <div className="upi-details">
                    <p><strong>Scan QR Code</strong> with any UPI app</p>
                    <p style={{ marginTop: '8px', fontSize: '13px' }}>
                      UPI ID: <strong>{upiId}</strong>
                    </p>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>
                      Amount: <strong>₹{bookingData?.flight?.price || '599'}</strong>
                    </p>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>
                      Status: {getStatusBadge()}
                    </p>
                  </div>
                  
                  {paymentStatus === 'processing' && (
                    <div className="payment-status processing">
                      <i className="fas fa-spinner fa-spin"></i> Waiting for payment confirmation...
                    </div>
                  )}
                  
                  {paymentStatus === 'completed' && (
                    <div className="payment-status completed">
                      <i className="fas fa-check-circle"></i> Payment Successful! Your booking is confirmed.
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link href="/review-booking" className="back-link">
              <i className="fas fa-arrow-left"></i> Back to Review
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
                <li><i className="fas fa-check-circle"></i> 100% Secure Checkout</li>
              </ul>
            </div>

            {paymentStatus === 'completed' && (
              <div className="sidebar-card" style={{ background: '#d1fae5' }}>
                <div className="card-title" style={{ color: '#065f46' }}>✅ Booking Confirmed!</div>
                <p style={{ textAlign: 'center', fontSize: '14px', color: '#065f46' }}>
                  Your dummy ticket will be delivered within 30-60 minutes.
                </p>
                <Link href="/booking-confirmation" className="pay-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
                  View Booking
                </Link>
              </div>
            )}

            <div className="secure-badge">
              <i className="fas fa-lock"></i> 100% Secure Payment via UPI
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}