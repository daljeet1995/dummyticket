'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PassengerPage() {
  const [passengers, setPassengers] = useState([
    {
      title: 'Mr',
      firstName: '',
      lastName: '',
      nationality: 'India',
      dob: '',
      noLastName: false
    }
  ]);

  const [contact, setContact] = useState({
    phone: '',
    email: ''
  });

  const [flightData, setFlightData] = useState<any>(null);

  useEffect(() => {
    // Get flight data from URL params
    const params = new URLSearchParams(window.location.search);
    const flightParam = params.get('flight');
    if (flightParam) {
      try {
        const flight = JSON.parse(decodeURIComponent(flightParam));
        setFlightData(flight);
      } catch (e) {
        console.error('Error parsing flight data', e);
      }
    }
  }, []);

  const addPassenger = () => {
    setPassengers([...passengers, {
      title: 'Mr',
      firstName: '',
      lastName: '',
      nationality: 'India',
      dob: '',
      noLastName: false
    }]);
  };

  const updatePassenger = (index: number, field: string, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save passenger and contact data to session storage
    const bookingData = {
      flight: flightData,
      passengers: passengers,
      contact: contact,
    };
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    window.location.href = '/review-booking';
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

          .flight-summary {
            background: #f8fafc;
            border-radius: 16px;
            padding: 20px 24px;
            margin-bottom: 30px;
            border: 1px solid #eef2f6;
            text-align: center;
          }

          .flight-summary .sector {
            font-size: 18px;
            font-weight: 700;
            color: #1a2332;
          }

          .flight-summary .sector span {
            color: #ff6d00;
          }

          .flight-summary .date {
            color: #64748b;
            font-size: 14px;
            margin-top: 4px;
          }

          .section-header {
            font-size: 18px;
            font-weight: 700;
            color: #1a2332;
            margin-bottom: 6px;
            text-align: center;
          }

          .section-sub {
            color: #64748b;
            font-size: 13px;
            margin-bottom: 20px;
            text-align: center;
          }

          .passenger-card {
            border: 1px solid #eef2f6;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 20px;
            background: #fafbfc;
          }

          .passenger-card .passenger-title {
            font-weight: 700;
            font-size: 16px;
            color: #1a2332;
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .passenger-card .passenger-title .remove-btn {
            background: none;
            border: none;
            color: #ef4444;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 16px;
            margin-bottom: 14px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .form-group label {
            font-size: 13px;
            font-weight: 600;
            color: #1a2332;
          }

          .form-group select,
          .form-group input {
            padding: 10px 14px;
            border: 1px solid #dce2ea;
            border-radius: 10px;
            font-size: 14px;
            background: #fff;
            transition: .3s;
            color: #1a2332;
            width: 100%;
          }

          .form-group select:focus,
          .form-group input:focus {
            border-color: #ff6d00;
            outline: none;
            box-shadow: 0 0 0 3px rgba(255, 109, 0, 0.12);
          }

          .form-group .checkbox-group {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 6px;
          }

          .form-group .checkbox-group input {
            width: 18px;
            height: 18px;
            accent-color: #ff6d00;
          }

          .add-passenger-btn {
            background: none;
            border: 1px dashed #dce2ea;
            border-radius: 12px;
            padding: 14px;
            width: 100%;
            font-size: 14px;
            font-weight: 600;
            color: #ff6d00;
            cursor: pointer;
            transition: .3s;
            margin-top: 8px;
          }

          .add-passenger-btn:hover {
            background: #fff7f0;
            border-color: #ff6d00;
          }

          .contact-section {
            margin-top: 30px;
            padding-top: 30px;
            border-top: 1px solid #eef2f6;
          }

          .contact-section .form-row {
            grid-template-columns: 1fr 1fr;
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

          @media(max-width: 900px) {
            .booking-container {
              grid-template-columns: 1fr;
              max-width: 600px;
            }
            .main-content {
              padding: 24px;
            }
            .form-row {
              grid-template-columns: 1fr;
            }
            .contact-section .form-row {
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
              <div className="step-line"></div>
              <div className="step">
                <span className="num">3</span> Review
              </div>
              <div className="step-line"></div>
              <div className="step">
                <span className="num">4</span> Payment
              </div>
            </div>

            <h1 className="booking-title">Booking Summary</h1>
            <p className="booking-subtitle">FLIGHT BOOKING - STEP 2 OF 4</p>

            {/* Flight Summary */}
            <div className="flight-summary">
              <div className="sector">
                {flightData ? `${flightData.origin} (${flightData.origin}) → ${flightData.destination} (${flightData.destination})` : 'NEW DELHI (DEL) → London (YXU)'}
              </div>
              <div className="date">Departure: {flightData?.departureTime || '2026-07-14'}</div>
            </div>

            {/* Passenger Details */}
            <div className="section-header">Passenger Details</div>
            <div className="section-sub">Use passport spelling only. This information will be used on the final document.</div>

            <form onSubmit={handleSubmit}>
              {passengers.map((p, index) => (
                <div className="passenger-card" key={index}>
                  <div className="passenger-title">
                    Passenger {index + 1}
                    {passengers.length > 1 && (
                      <button 
                        type="button"
                        className="remove-btn" 
                        onClick={() => {
                          const updated = passengers.filter((_, i) => i !== index);
                          setPassengers(updated);
                        }}
                      >
                        <i className="fas fa-trash"></i> Remove
                      </button>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Title</label>
                      <select value={p.title} onChange={(e) => updatePassenger(index, 'title', e.target.value)}>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Dr">Dr</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" placeholder="Enter first name" value={p.firstName} onChange={(e) => updatePassenger(index, 'firstName', e.target.value)} required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" placeholder="Enter last name" value={p.lastName} onChange={(e) => updatePassenger(index, 'lastName', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Nationality</label>
                      <select value={p.nationality} onChange={(e) => updatePassenger(index, 'nationality', e.target.value)}>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                        <option value="China">China</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input type="date" value={p.dob} onChange={(e) => updatePassenger(index, 'dob', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <div className="checkbox-group">
                        <input type="checkbox" checked={p.noLastName} onChange={(e) => updatePassenger(index, 'noLastName', e.target.checked)} />
                        <label style={{ fontWeight: '400', fontSize: '14px', color: '#64748b' }}>No Last Name on Passport</label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" className="add-passenger-btn" onClick={addPassenger}>
                <i className="fas fa-plus"></i> Add Passenger
              </button>

              {/* Contact Details */}
              <div className="contact-section">
                <div className="section-header">Contact Details</div>
                <div className="section-sub">Booking confirmation and invoice will be sent to this contact.</div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Enter phone number" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter email address" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} required />
                  </div>
                </div>
              </div>

              <button type="submit" className="proceed-btn">
                Proceed to Review
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-card">
              <div className="card-title">Final Fare</div>
              <div className="price">₹{flightData?.price || '599'} <small>inclusive of taxes & charges</small></div>

              <ul className="benefits">
                <li><i className="fas fa-check-circle"></i> Secure booking with instant confirmation</li>
                <li><i className="fas fa-check-circle"></i> Instant Booking Confirmation</li>
                <li><i className="fas fa-check-circle"></i> Visa, Embarkation, Documentation</li>
              </ul>
            </div>

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