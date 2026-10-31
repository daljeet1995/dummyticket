'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BASE_FARE = 599;

type ToastType = 'success' | 'info' | 'error';

interface Toast {
  message: string;
  type: ToastType;
}

interface PromoMessage {
  type: 'success' | 'error';
  text: string;
}

export default function PassengerDetailsPage() {
  const [passengers, setPassengers] = useState<number[]>([1]);
  const [promoMessage, setPromoMessage] = useState<PromoMessage | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const toggleLastName = (id: number): void => {
    const checkbox = document.getElementById(`noLastName-${id}`) as HTMLInputElement | null;
    const input = document.getElementById(`lastName-${id}`) as HTMLInputElement | null;
    if (checkbox && input) {
      if (checkbox.checked) {
        input.value = '';
        input.disabled = true;
        input.style.backgroundColor = '#f1f5f9';
      } else {
        input.disabled = false;
        input.style.backgroundColor = '#ffffff';
      }
    }
  };

  const addPassenger = (): void => {
    setPassengers((prev) => [...prev, Date.now()]);
    showToast('Passenger added', 'success');
  };

  const removePassenger = (key: number): void => {
    setPassengers((prev) => prev.filter((k) => k !== key));
    showToast('Passenger removed', 'info');
  };

  const totalFare = passengers.length * BASE_FARE;

  const applyPromo = (): void => {
    const input = document.getElementById('promoInput') as HTMLInputElement | null;
    const val = input?.value.trim().toUpperCase();

    if (!val) {
      setPromoMessage({ type: 'error', text: 'Please enter a coupon code.' });
      return;
    }

    if (val === 'SAVE10' || val === 'SMARTBIZZ' || val === 'WELCOME') {
      setPromoMessage({ type: 'success', text: '✓ Coupon code applied successfully!' });
      showToast('Coupon discount applied!', 'success');
    } else {
      setPromoMessage({ type: 'error', text: "Invalid promo code. Try 'SAVE10'." });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    showToast('Redirecting to Review Page...', 'success');
  };

  const showToast = (message: string, type: ToastType = 'success'): void => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      {/* 
        Is style block mein saari custom CSS aur Tailwind override daal diya gaya hai,
        taaki aapko globals.css ya tailwind.config change karne ki zaroorat na pade.
      */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

        body {
          font-family: 'Inter', sans-serif !important;
          background-color: #ebf0f7 !important;
          color: #1e293b !important;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Inline utility classes in case Tailwind is broken */
        .page-wrap { width: 100%; max-width: 1280px; margin: 0 auto; padding: 32px 16px; box-sizing: border-box; }
        .flex { display: flex; }
        .grid { display: grid; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .items-start { align-items: flex-start; }
        
        /* Grid definitions */
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .lg-grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
        .lg-col-span-8 { grid-column: span 8 / span 8; }
        .lg-col-span-4 { grid-column: span 4 / span 4; }
        .gap-8 { gap: 32px; }
        .gap-6 { gap: 24px; }
        .gap-4 { gap: 16px; }
        .gap-2 { gap: 8px; }
        
        @media (max-width: 1024px) {
          .lg-grid-cols-12 { grid-template-columns: 1fr; }
          .lg-col-span-8, .lg-col-span-4 { grid-column: auto; }
        }

        /* Card & Background Utilities */
        .bg-white { background-color: #ffffff; }
        .rounded-3xl { border-radius: 24px; }
        .rounded-2xl { border-radius: 16px; }
        .rounded-xl { border-radius: 12px; }
        .rounded-lg { border-radius: 8px; }
        .rounded-full { border-radius: 9999px; }
        .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        .shadow-card { box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
        .shadow-custom { box-shadow: 0 10px 30px -5px rgba(10, 76, 180, 0.08); }
        .shadow-orange-glow { box-shadow: 0 4px 15px rgba(255, 119, 0, 0.35); }
        .border { border: 1px solid #e2e8f0; }
        .border-b { border-bottom: 1px solid #e2e8f0; }
        
        /* Colors */
        .text-slate-800 { color: #1e293b; }
        .text-slate-700 { color: #334155; }
        .text-slate-600 { color: #475569; }
        .text-slate-500 { color: #64748b; }
        .text-blue-100 { color: #dbeafe; }
        .text-blue-200 { color: #bfdbfe; }
        .text-blue-300 { color: #93c5fd; }
        .text-emerald-400 { color: #34d399; }
        .text-emerald-600 { color: #059669; }
        .text-rose-500 { color: #f43f5e; }
        .text-rose-700 { color: #be123c; }
        .text-yellow-300 { color: #fde047; }
        .text-yellow-500 { color: #eab308; }
        .text-white { color: #ffffff; }
        
        .bg-slate-900 { background-color: #0f172a; }
        .bg-slate-200 { background-color: #e2e8f0; }
        .bg-slate-100 { background-color: #f1f5f9; }
        .bg-blue-50 { background-color: #eff6ff; }
        .bg-rose-50 { background-color: #fff1f2; }
        .bg-orange-50 { background-color: #fff7ed; }
        
        /* Text Sizes */
        .text-xs { font-size: 12px; line-height: 16px; }
        .text-sm { font-size: 14px; line-height: 20px; }
        .text-base { font-size: 16px; line-height: 24px; }
        .text-lg { font-size: 18px; line-height: 28px; }
        .text-xl { font-size: 20px; line-height: 28px; }
        .text-2xl { font-size: 24px; line-height: 32px; }
        .text-3xl { font-size: 30px; line-height: 36px; }
        
        .font-medium { font-weight: 500; }
        .font-semibold { font-weight: 600; }
        .font-bold { font-weight: 700; }
        .font-extrabold { font-weight: 800; }
        .font-black { font-weight: 900; }
        
        .uppercase { text-transform: uppercase; }
        .tracking-wider { letter-spacing: 0.05em; }
        .tracking-tight { letter-spacing: -0.025em; }

        /* Padding & Margin */
        .p-3 { padding: 12px; }
        .p-5 { padding: 20px; }
        .p-6 { padding: 24px; }
        .px-3 { padding-left: 12px; padding-right: 12px; }
        .px-4 { padding-left: 16px; padding-right: 16px; }
        .px-5 { padding-left: 20px; padding-right: 20px; }
        .px-6 { padding-left: 24px; padding-right: 24px; }
        .px-8 { padding-left: 32px; padding-right: 32px; }
        .py-1 { padding-top: 4px; padding-bottom: 4px; }
        .py-1\\.5 { padding-top: 6px; padding-bottom: 6px; }
        .py-2 { padding-top: 8px; padding-bottom: 8px; }
        .py-2\\.5 { padding-top: 10px; padding-bottom: 10px; }
        .py-3 { padding-top: 12px; padding-bottom: 12px; }
        .py-4 { padding-top: 16px; padding-bottom: 16px; }
        .py-8 { padding-top: 32px; padding-bottom: 32px; }
        .mt-2 { margin-top: 8px; }
        .mt-3 { margin-top: 12px; }
        .mt-4 { margin-top: 16px; }
        .mb-2 { margin-bottom: 8px; }
        .mb-6 { margin-bottom: 24px; }
        .mb-8 { margin-bottom: 32px; }
        .pb-4 { padding-bottom: 16px; }
        .pb-5 { padding-bottom: 20px; }
        
        .w-full { width: 100%; }
        .w-36 { width: 144px; }
        .w-6 { width: 24px; }
        .w-8 { width: 32px; }
        .w-48 { width: 192px; }
        .h-6 { height: 24px; }
        .h-8 { height: 32px; }
        .h-48 { height: 192px; }
        
        .custom-input {
          transition: all 0.2s ease-in-out;
          border: 1px solid #e2e8f0;
          outline: none;
        }
        .custom-input:focus {
          border-color: #0a4cb4;
          box-shadow: 0 0 0 3px rgba(10, 76, 180, 0.15);
        }

        /* Custom Gradients */
        .gradient-banner { background: linear-gradient(135deg, #074bb8 0%, #002d7e 100%); }
        .gradient-fare { background: linear-gradient(180deg, #0947a5 0%, #032766 100%); }
        
        /* Specific Brand Colors */
        .text-brand-blue { color: #0a4cb4; }
        .text-brand-darkBlue { color: #002663; }
        .text-brand-orange { color: #ff7700; }
        .bg-brand-orange { background-color: #ff7700; }
        .bg-brand-orange:hover { background-color: #e66b00; }
        
        .step-inactive { background-color: #f1f5f9; color: #475569; }
        .step-active {
          background: linear-gradient(135deg, #ff8800 0%, #ff6600 100%);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(255, 119, 0, 0.3);
        }

        .backdrop-blur-md { backdrop-filter: blur(12px); }
        .backdrop-blur-sm { backdrop-filter: blur(4px); }
        .bg-white\\/20 { background-color: rgba(255, 255, 255, 0.2); }
        .bg-white\\/10 { background-color: rgba(255, 255, 255, 0.1); }
        .bg-white\\/5 { background-color: rgba(255, 255, 255, 0.05); }

        /* Forms */
        select, input { font-family: inherit; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
      `}</style>

      <Header />

      <div className="page-wrap">
        {/* Step Navigation */}
        <div className="bg-white p-3 rounded-2xl shadow-card mb-8">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
            <div className="step-inactive py-3 px-4 rounded-xl flex items-center justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">1</span>
              <span>Details</span>
            </div>
            <div className="step-active py-3 px-4 rounded-xl flex items-center justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs">2</span>
              <span>Passenger</span>
            </div>
            <div className="step-inactive py-3 px-4 rounded-xl flex items-center justify-center gap-2" style={{ opacity: 0.6 }}>
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">3</span>
              <span>Review</span>
            </div>
            <div className="step-inactive py-3 px-4 rounded-xl flex items-center justify-center gap-2" style={{ opacity: 0.6 }}>
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">4</span>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg-grid-cols-12 gap-8 items-start">
          {/* LEFT: Form */}
          <div className="lg-col-span-8 flex-col gap-6" style={{ display: 'flex' }}>
            <div className="gradient-banner text-white p-6 rounded-3xl shadow-custom" style={{ position: 'relative', overflow: 'hidden' }}>
              <div className="flex justify-between items-start" style={{ position: 'relative', zIndex: 10 }}>
                <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold tracking-wider uppercase">
                  STEP 2 OF 4
                </span>
                <div className="bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-2">
                  <i className="fa-solid fa-lock text-yellow-300"></i> SSL Secure
                </div>
              </div>
              <h1 className="text-2xl font-extrabold mt-4 mb-2 tracking-tight text-white" style={{ margin: '16px 0 8px 0' }}>Passenger Details</h1>
              <p className="text-blue-100 text-sm font-normal">
                Use passport spelling only. This information will be used on the final document.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="flex-col gap-6" style={{ display: 'flex' }}>
              <div className="flex-col gap-6" style={{ display: 'flex' }}>
                {passengers.map((key, index) => {
                  const idx = index + 1;
                  const isFirst = index === 0;
                  return (
                    <div key={key} className="bg-white p-6 rounded-3xl shadow-card border animate-fade-in">
                      <div className="flex items-center justify-between border-b pb-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-sm">
                            <i className={`fa-solid ${isFirst ? 'fa-user' : 'fa-user-plus'}`}></i>
                          </div>
                          <h2 className="text-lg font-bold text-slate-800">Passenger {idx}</h2>
                        </div>
                        {isFirst ? (
                          <span className="bg-blue-50 text-brand-blue text-xs font-bold px-3 py-1 rounded-full">
                            Primary traveller
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => removePassenger(key)}
                            className="text-xs font-bold text-rose-500 hover:text-rose-700 bg-rose-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                            style={{ border: 'none', cursor: 'pointer' }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
                        <div style={{ gridColumn: 'span 3' }}>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Title</label>
                          <select required defaultValue="Mr" className="custom-input w-full p-3 rounded-xl bg-white text-slate-800 text-sm font-medium">
                            <option value="Mr">Mr</option>
                            <option value="Ms">Ms</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Master">Master</option>
                          </select>
                        </div>
                        <div style={{ gridColumn: 'span 4' }}>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">First Name</label>
                          <input type="text" required placeholder="Enter first name" className="custom-input w-full p-3 rounded-xl text-sm font-medium" />
                        </div>
                        <div style={{ gridColumn: 'span 5' }}>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Last Name</label>
                          <input type="text" id={`lastName-${idx}`} placeholder="Enter last name" className="custom-input w-full p-3 rounded-xl text-sm font-medium" />
                          <div className="flex items-center mt-2">
                            <input type="checkbox" id={`noLastName-${idx}`} onChange={() => toggleLastName(idx)} style={{ width: '16px', height: '16px', accentColor: '#0a4cb4' }} />
                            <label htmlFor={`noLastName-${idx}`} className="ml-2 text-xs text-slate-600 font-semibold cursor-pointer select-none">
                              No Last Name on Passport
                            </label>
                          </div>
                        </div>
                        <div style={{ gridColumn: 'span 6' }}>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Nationality</label>
                          <select required defaultValue="India" className="custom-input w-full p-3 rounded-xl bg-white text-slate-800 text-sm font-medium">
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                          </select>
                        </div>
                        <div style={{ gridColumn: 'span 6' }}>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Date of Birth</label>
                          <input type="date" required className="custom-input w-full p-3 rounded-xl text-sm font-medium text-slate-700" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={addPassenger}
                className="bg-blue-50 text-brand-blue font-bold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
                style={{ border: '1px solid #dbeafe', cursor: 'pointer', width: 'fit-content' }}
              >
                <i className="fa-solid fa-plus text-xs"></i>
                <span>Add Passenger</span>
              </button>

              {/* Contact Details */}
              <div className="bg-white p-6 rounded-3xl shadow-card border">
                <div className="mb-6">
                  <span className="bg-orange-50 text-brand-orange text-xs font-extrabold px-3 py-1 rounded-md uppercase tracking-wider">CONTACT</span>
                  <h2 className="text-xl font-bold text-slate-800 mt-2">Contact Details</h2>
                  <p className="text-xs text-slate-500 font-medium">Booking confirmation and invoice will be sent to this contact.</p>
                </div>
                <div className="flex-col gap-4" style={{ display: 'flex' }}>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Phone Number</label>
                    <div className="flex gap-2">
                      <select defaultValue="+91" className="custom-input w-36 p-3 rounded-xl bg-white text-sm font-semibold text-slate-700">
                        <option value="+91">+91 (India)</option>
                        <option value="+1">+1 (USA/CAN)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+971">+971 (UAE)</option>
                      </select>
                      <input type="tel" required placeholder="Phone Number" pattern="[0-9]{10}" title="Please enter 10 digit phone number" className="custom-input flex-1 p-3 rounded-xl text-sm font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Email Address</label>
                    <input type="email" required placeholder="Enter email address" className="custom-input w-full p-3 rounded-xl text-sm font-medium" />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-brand-orange text-white font-extrabold py-4 px-8 rounded-2xl text-base shadow-orange-glow transition-all flex items-center justify-center gap-2"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  <span>Proceed to Review</span>
                  <i className="fa-solid fa-arrow-right text-sm"></i>
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Booking Summary */}
          <div className="lg-col-span-4 flex-col gap-6" style={{ display: 'flex' }}>
            <div className="bg-white p-6 rounded-3xl shadow-card border flex-col gap-6" style={{ display: 'flex' }}>
              <div className="flex-col gap-2" style={{ display: 'flex' }}>
                <h2 className="text-2xl font-black text-brand-darkBlue tracking-tight">Booking Summary</h2>
                <div className="bg-blue-50 text-brand-blue text-xs font-extrabold py-2 px-4 rounded-xl text-center tracking-wider">
                  FLIGHT BOOKING
                </div>
              </div>

              <div className="flex-col gap-4 border-b pb-5" style={{ display: 'flex' }}>
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                  <i className="fa-solid fa-plane text-xs"></i>
                  <span>Flight Details</span>
                </div>
                <div className="flex-col gap-2 text-xs font-semibold" style={{ display: 'flex' }}>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Sector</span>
                    <span className="text-slate-800 font-bold">NEW DELHI (DEL) → MUMBAI (BOM)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Departure</span>
                    <span className="text-slate-800 font-bold">2026-12-02</span>
                  </div>
                </div>
              </div>

              <div className="gradient-fare rounded-2xl p-5 text-white flex-col gap-4 shadow-lg" style={{ display: 'flex' }}>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-blue-200 block font-medium">Final Fare</span>
                    <span className="text-[10px] text-blue-300">Inclusive of taxes & charges</span>
                  </div>
                  <div className="text-3xl font-black tracking-tight">₹ {totalFare}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 text-center text-xs font-medium text-blue-100 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
                  <span>Secure booking with instant confirmation</span>
                </div>

                <div className="flex-col gap-2 text-xs" style={{ display: 'flex', paddingTop: '8px' }}>
                  <p className="font-bold text-white text-[11px] uppercase tracking-wider">Package Benefits</p>
                  <ul className="flex-col gap-2 text-blue-100 font-medium" style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
                    <li className="flex items-center gap-2">
                      <i className="fa-solid fa-square-check text-emerald-400 text-sm"></i>
                      <span>Instant Booking Confirmation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fa-solid fa-square-check text-emerald-400 text-sm"></i>
                      <span>Visa Friendly Documents</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fa-solid fa-square-check text-emerald-400 text-sm"></i>
                      <span>Priority Travel Support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fa-solid fa-square-check text-emerald-400 text-sm"></i>
                      <span>Secure Online Payment</span>
                    </li>
                  </ul>
                </div>

                <div style={{ paddingTop: '8px' }}>
                  <div className="bg-white text-slate-800 text-xs font-extrabold py-3 rounded-xl text-center shadow-md flex items-center justify-center gap-2">
                    <i className="fa-solid fa-lock text-yellow-500"></i>
                    <span>100% Secure Checkout</span>
                  </div>
                </div>
              </div>

              <div className="flex-col gap-3" style={{ display: 'flex' }}>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Coupons & Offers</h3>
                  <p className="text-xs text-slate-500">Apply available promo code before review.</p>
                </div>
                <div className="flex gap-2">
                  <input type="text" id="promoInput" placeholder="Enter promo code" className="custom-input uppercase flex-1 p-3 rounded-xl text-xs font-bold text-slate-700" />
                  <button type="button" onClick={applyPromo} className="bg-brand-orange text-white font-bold px-5 py-3 rounded-xl text-xs shadow-md transition-colors" style={{ border: 'none', cursor: 'pointer' }}>
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <div className={`text-xs font-bold ${promoMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {promoMessage.text}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          transform: toast ? 'translateY(0)' : 'translateY(80px)',
          opacity: toast ? 1 : 0,
          transition: 'all 0.3s',
          backgroundColor: '#0f172a',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 50
        }}
      >
        {toast && (
          <>
            <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check text-emerald-400' : toast.type === 'info' ? 'fa-circle-info text-blue-400' : 'fa-circle-exclamation text-rose-400'}`}></i>
            <span className="text-xs font-semibold">{toast.message}</span>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}