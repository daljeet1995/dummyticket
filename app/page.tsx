'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState('flight');
  const [tripType, setTripType] = useState('oneway');
  const [showReturn, setShowReturn] = useState(false);
  const [showMultiCity, setShowMultiCity] = useState(false);
  const [hotelCount, setHotelCount] = useState(1);
  const [multiCityRoutes, setMultiCityRoutes] = useState(1);
  const [activeFaq, setActiveFaq] = useState(0);
  
  // Search states
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flightResults, setFlightResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchCardRef = useRef<HTMLDivElement>(null);

  // Search flights function
  const searchFlights = async () => {
    if (!fromCity || !toCity || !departureDate) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setSearchPerformed(true);

    try {
      const response = await fetch('/api/search-flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: fromCity.replace(/\(.*\)/, '').trim(),
          destination: toCity.replace(/\(.*\)/, '').trim(),
          departureDate: departureDate,
          returnDate: tripType === 'roundtrip' ? returnDate : undefined,
          tripType,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setFlightResults(data.flights);
      } else {
        alert(data.message || 'No flights found');
        setFlightResults([]);
      }
    } catch (error) {
      console.error('Error searching flights:', error);
      alert('Error searching flights. Please try again.');
      setFlightResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Select flight and navigate to passenger page
  const selectFlight = (flight: any) => {
    sessionStorage.setItem('selectedFlight', JSON.stringify(flight));
    window.location.href = `/passenger?flight=${encodeURIComponent(JSON.stringify(flight))}`;
  };

  useEffect(() => {
    // Initialize any third-party scripts or functions
    if (typeof window !== 'undefined') {
      // @ts-ignore
      if (window.initDatePickers) {
        // @ts-ignore
        window.initDatePickers(document);
      }
      // @ts-ignore
      if (window.applyWebsiteMinDateToAllCalendars) {
        // @ts-ignore
        window.applyWebsiteMinDateToAllCalendars();
      }
      // @ts-ignore
      if (window.updateRouteNumbers) {
        // @ts-ignore
        window.updateRouteNumbers();
      }
      // @ts-ignore
      if (window.refreshMultiCityDateLocks) {
        // @ts-ignore
        window.refreshMultiCityDateLocks();
      }
    }
  }, []);

  const switchSearchTab = (tab: string) => {
    setActiveTab(tab);
    // Update hidden input value
    const serviceInput = document.getElementById('service_type') as HTMLInputElement;
    if (serviceInput) serviceInput.value = tab;
  };

  const switchTripType = (type: string) => {
    setTripType(type);
    setShowReturn(type === 'roundtrip');
    setShowMultiCity(type === 'multicity');
    
    // @ts-ignore
    if (window.switchTripType) {
      // @ts-ignore
      window.switchTripType(type);
    }
  };

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
    
    // @ts-ignore
    if (window.swapCities) {
      // @ts-ignore
      window.swapCities();
    }
  };

  const toggleFAQ = (index: number) => {
    setActiveFaq(activeFaq === index ? -1 : index);
  };

  const scrollToSearch = (tab: string) => {
    setActiveTab(tab);
    searchCardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqData = [
    {
      q: 'Is Dummy Flight Ticket Legal Or Illegal?',
      a: 'A dummy flight ticket is a temporary reservation or itinerary format used for travel planning and documentation. It should be used only for genuine travel documentation purposes.'
    },
    {
      q: 'Will PNR Show On The Airline Website?',
      a: 'Some reservations may include a PNR-style booking reference depending on airline and route availability. Verification depends on the airline system and reservation validity.'
    },
    {
      q: 'What is Onward Ticket meaning?',
      a: 'An onward ticket means proof that the traveller plans to leave the destination country and continue to another country or return home.'
    },
    {
      q: 'What Is The Difference Between An Onward Flight Ticket And A Return Flight Ticket?',
      a: 'A return flight ticket is usually back to the original departure country. An onward ticket may be from the destination country to another country.'
    },
    {
      q: 'What Is A Dummy Hotel Booking?',
      a: 'A dummy hotel booking is a hotel reservation-style document showing planned accommodation details such as city, check-in date and check-out date.'
    },
    {
      q: 'Why Do I Need A Dummy Hotel Booking For Visa?',
      a: 'Many visa files require accommodation details to show the planned stay. A hotel booking format helps present your itinerary clearly.'
    },
    {
      q: 'Will A Dummy Hotel Booking Guarantee My Visa Approval?',
      a: 'No document can guarantee visa approval. Final decision is always taken by the embassy or visa officer based on the complete application.'
    },
    {
      q: 'Is a Dummy Ticket the Same as a Confirmed Flight Ticket for Schengen Visa?',
      a: 'A dummy ticket is generally a reservation or itinerary format, while a confirmed ticket is a fully paid airline ticket. Requirements can vary by visa file.'
    },
    {
      q: 'What Are Dummy Tickets Airlines?',
      a: 'Dummy tickets airlines means airline-style reservation formats prepared according to route and airline availability.'
    },
    {
      q: 'In What Format Will I Receive The Dummy Ticket?',
      a: 'You will receive the document in a clean PDF-style format containing route, date, passenger and booking reference-style information.'
    },
    {
      q: 'Which Airline Dummy Ticket Will I Be Getting?',
      a: 'Airline selection depends on your selected route, date and availability. The final format is prepared according to practical route options.'
    },
    {
      q: 'What Is A Flight Itinerary?',
      a: 'A flight itinerary is a planned flight schedule showing origin, destination, date, timing, airline and passenger details.'
    }
  ];

  const airlines = [
    { src: '/images/airlines/air_india.png', name: 'Air India' },
    { src: '/images/airlines/british_airways.png', name: 'British Airways' },
    { src: '/images/airlines/emirates.png', name: 'Emirates' },
    { src: '/images/airlines/philippine_airlines.png', name: 'Philippine Airlines' },
    { src: '/images/airlines/srilankan.png', name: 'Srilankan' },
    { src: '/images/airlines/thai.png', name: 'Thai' },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="trust-row enhanced-trust-row">
            <span>Visa Ready</span>
            <span>30–60 Min Delivery</span>
            <span>Secure Payment</span>
          </div>
          <h1>
            Book Dummy Flight &amp; Hotel Reservations for Visa Applications
          </h1>
          <div className="hero-highlights">
            <div><b>24×7</b><small>Support</small></div>
            <div><b>4 Step</b><small>Simple Process</small></div>
            <div><b>Clean PDF</b><small>Ready Format</small></div>
          </div>
        </div>
      </section>

      {/* Search Area */}
      <main className="search-area">
        <section className="search-card" ref={searchCardRef}>
          <form
            action="https://dummyticket.tsbizz.com/Dummyflight/passenger.php"
            method="POST"
            id="searchForm"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              searchFlights();
            }}
          >
            <input
              type="hidden"
              name="service_type"
              id="service_type"
              value={activeTab}
            />

            <div className="booking-tabs" role="tablist">
              <button
                type="button"
                className={`booking-tab ${activeTab === 'flight' ? 'active' : ''}`}
                onClick={() => switchSearchTab('flight')}
              >
                <span className="tab-icon">✈️</span> Flights
              </button>
              <button
                type="button"
                className={`booking-tab ${activeTab === 'hotel' ? 'active' : ''}`}
                onClick={() => switchSearchTab('hotel')}
              >
                <span className="tab-icon">🏨</span> Hotels
              </button>
              <button
                type="button"
                className={`booking-tab ${activeTab === 'both' ? 'active' : ''}`}
                onClick={() => switchSearchTab('both')}
              >
                <span className="tab-icon">🌍</span> Flight + Hotel
              </button>
            </div>

            <div className="fare-strip">
              <span>Flight reservation from ₹599</span>
              <span>Delivery in 30–60 minutes</span>
              <span>Support available</span>
            </div>

            {/* Flight Section */}
            <div id="flightSection" className="search-section" style={{ display: activeTab === 'hotel' ? 'none' : 'block' }}>
              <div className="section-head">
                <div>
                  <h2>Search Flights</h2>
                  <p>Select route, date and trip type</p>
                </div>
                <div className="trip-types">
                  <label className={`trip-pill ${tripType === 'oneway' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="tripType"
                      value="oneway"
                      checked={tripType === 'oneway'}
                      onChange={() => switchTripType('oneway')}
                    />
                    One Way
                  </label>
                  <label className={`trip-pill ${tripType === 'roundtrip' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="tripType"
                      value="roundtrip"
                      checked={tripType === 'roundtrip'}
                      onChange={() => switchTripType('roundtrip')}
                    />
                    Round Trip
                  </label>
                  <label className={`trip-pill ${tripType === 'multicity' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="tripType"
                      value="multicity"
                      checked={tripType === 'multicity'}
                      onChange={() => switchTripType('multicity')}
                    />
                    Multi City
                  </label>
                </div>
              </div>

              <div id="flightSingle" className="flight-grid" style={{ display: tripType === 'multicity' ? 'none' : 'grid' }}>
                <div className="field-card autocomplete-box big-field">
                  <label>From</label>
                  <input
                    name="fromCity"
                    id="fromCity"
                    placeholder="Delhi (DEL)"
                    autoComplete="off"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                  />
                  <small>Origin airport/city</small>
                  <div className="suggestions" id="fromList"></div>
                </div>

                <button
                  type="button"
                  className="swap-btn"
                  onClick={swapCities}
                  aria-label="Swap cities"
                >
                  ⇄
                </button>

                <div className="field-card autocomplete-box big-field">
                  <label>To</label>
                  <input
                    name="toCity"
                    id="toCity"
                    placeholder="London (LHR)"
                    autoComplete="off"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                  />
                  <small>Destination airport/city</small>
                  <div className="suggestions" id="toList"></div>
                </div>

                <div className="field-card date-card">
                  <label>Departure</label>
                  <input
                    type="date"
                    id="departureDate"
                    className="date-input"
                    name="departureDate"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                  <small>Travel date</small>
                </div>

                <div
                  className="field-card date-card"
                  id="returnDateWrap"
                  style={{ display: showReturn ? 'block' : 'none' }}
                >
                  <label>Return</label>
                  <input
                    type="date"
                    id="returnDate"
                    className="date-input"
                    name="returnDate"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                  <small>Return date</small>
                </div>
              </div>

              <div
                id="multiCitySection"
                className="multi-section"
                style={{ display: showMultiCity ? 'block' : 'none' }}
              >
                <div id="multiCityBox">
                  {Array.from({ length: multiCityRoutes }).map((_, index) => (
                    <div className="route-card multi-flight" key={index}>
                      <div className="route-title">Route {index + 1}</div>
                      <div className="route-fields">
                        <div className="field-card autocomplete-box">
                          <label>From</label>
                          <input
                            name="multiFrom[]"
                            className="multiFrom"
                            placeholder="Origin"
                            autoComplete="off"
                          />
                          <div className="suggestions"></div>
                        </div>
                        <div className="field-card autocomplete-box">
                          <label>To</label>
                          <input
                            name="multiTo[]"
                            className="multiTo"
                            placeholder="Destination"
                            autoComplete="off"
                          />
                          <div className="suggestions"></div>
                        </div>
                        <div className="field-card">
                          <label>Travel Date</label>
                          <input
                            type="date"
                            className="multiDate date-input"
                            name="multiDate[]"
                            placeholder="Select date"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" id="addFlightBtn" className="add-btn" onClick={() => setMultiCityRoutes(prev => Math.min(prev + 1, 3))}>
                  {multiCityRoutes >= 3 ? 'Maximum 3 Routes Added' : '+ Add Route'}
                </button>
              </div>

              <div className="form-error" id="formError"></div>

              <div className="search-actions">
                <div className="assurance">
                  <b>100%</b> clean reservation format for visa file use
                </div>
                <button type="submit" className="search-btn" disabled={loading}>
                  {loading ? 'Searching...' : 'Search & Continue'}
                </button>
              </div>
            </div>

            {/* Hotel Section */}
            <div id="hotelSection" className="search-section" style={{ display: (activeTab === 'hotel' || activeTab === 'both') ? 'block' : 'none' }}>
              <div className="section-head">
                <div>
                  <h2>Search Hotels</h2>
                  <p>Add hotel city and stay dates</p>
                </div>
              </div>

              <div id="hotelBox">
                {Array.from({ length: hotelCount }).map((_, index) => (
                  <div className="route-card hotel-row" key={index}>
                    <div className="route-title">Hotel {index + 1}</div>
                    <div className="route-fields hotel-fields">
                      <div className="field-card autocomplete-box">
                        <label>City / Hotel</label>
                        <input
                          name="hotelCity[]"
                          className="hotelCity"
                          placeholder="Search city or hotel"
                          autoComplete="off"
                        />
                        <div className="suggestions"></div>
                      </div>
                      <div className="field-card">
                        <label>Check-In</label>
                        <input
                          type="date"
                          className="checkin date-input"
                          name="checkin[]"
                          placeholder="Select date"
                        />
                      </div>
                      <div className="field-card">
                        <label>Check-Out</label>
                        <input
                          type="date"
                          className="checkout date-input"
                          name="checkout[]"
                          placeholder="Select date"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button type="button" id="addHotelBtn" className="add-btn" onClick={() => setHotelCount(prev => Math.min(prev + 1, 3))}>
                {hotelCount >= 3 ? 'Maximum 3 Hotels Added' : '+ Add Hotel'}
              </button>

              <div className="search-actions">
                <div className="assurance">
                  <b>100%</b> clean reservation format for visa file use
                </div>
                <button type="submit" className="search-btn">Search & Continue</button>
              </div>
            </div>
          </form>

          {/* Flight Results */}
          {searchPerformed && (
            <div className="flight-results" style={{ marginTop: '30px' }}>
              {loading ? (
                <div className="loading-spinner" style={{ textAlign: 'center', padding: '40px' }}>
                  <i className="fas fa-spinner fa-spin" style={{ fontSize: '30px', color: '#ff6d00' }}></i>
                  <p style={{ marginTop: '10px', color: '#64748b' }}>Searching for flights...</p>
                </div>
              ) : flightResults.length > 0 ? (
                <div className="results-grid">
                  <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '700' }}>
                    Available Flights ({flightResults.length})
                  </h3>
                  {flightResults.map((flight: any, index) => (
                    <div className="flight-card" key={index} style={{
                      border: '1px solid #eef2f6',
                      borderRadius: '16px',
                      padding: '20px',
                      marginBottom: '16px',
                      background: '#fff',
                      transition: 'all 0.3s',
                    }}>
                      <div className="flight-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div className="airline-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={flight.airlineLogo || '/images/airlines/default.png'} 
                            alt={flight.airline} 
                            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/airlines/default.png';
                            }}
                          />
                          <span style={{ fontWeight: '600' }}>{flight.airline}</span>
                        </div>
                        <div className="flight-price" style={{ fontSize: '24px', fontWeight: '800', color: '#1a2332' }}>
                          ₹{flight.price}
                        </div>
                      </div>
                      <div className="flight-route" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid #f0f4f9', borderBottom: '1px solid #f0f4f9' }}>
                        <div className="origin" style={{ textAlign: 'center' }}>
                          <span className="code" style={{ fontSize: '18px', fontWeight: '700', display: 'block' }}>{flight.origin}</span>
                          <span className="time" style={{ fontSize: '14px', color: '#64748b' }}>{flight.departureTime}</span>
                        </div>
                        <div className="flight-arrow" style={{ fontSize: '20px', color: '#64748b' }}>→</div>
                        <div className="destination" style={{ textAlign: 'center' }}>
                          <span className="code" style={{ fontSize: '18px', fontWeight: '700', display: 'block' }}>{flight.destination}</span>
                          <span className="time" style={{ fontSize: '14px', color: '#64748b' }}>{flight.arrivalTime}</span>
                        </div>
                      </div>
                      <div className="flight-details" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '14px', color: '#64748b' }}>
                        <span>Duration: {flight.duration}</span>
                        <span>Stops: {flight.stops}</span>
                        <span>Booking: {flight.bookingCode}</span>
                      </div>
                      <button 
                        onClick={() => selectFlight(flight)}
                        className="select-flight-btn"
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'linear-gradient(135deg, #ff7b00, #ff9800)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          marginTop: '8px',
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                          (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(255, 123, 0, 0.35)';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                          (e.target as HTMLButtonElement).style.boxShadow = 'none';
                        }}
                      >
                        Select Flight
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results" style={{ textAlign: 'center', padding: '40px', background: '#f8fafc', borderRadius: '16px' }}>
                  <i className="fas fa-plane-slash" style={{ fontSize: '40px', color: '#64748b', marginBottom: '16px' }}></i>
                  <p style={{ fontSize: '16px', color: '#1a2332' }}>No flights found for the selected route.</p>
                  <p style={{ fontSize: '14px', color: '#64748b' }}>Please try different dates or destinations.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Booking Process */}
      <section className="section booking-process-section" id="howItWorks">
        <div className="section-heading">
          <span>Booking Process</span>
          <h2>Book your dummy ticket in 4 simple steps</h2>
          <p>
            Choose your destination, fill traveller details, pay the booking
            amount and receive your reservation copy quickly.
          </p>
        </div>

        <div className="booking-process-grid">
          {[
            { icon: '🧭', no: '01', title: 'Select Your Destination', desc: 'Choose your origin and destination with the desired travel date.' },
            { icon: '📝', no: '02', title: 'Fill Your Details', desc: 'Fill the required details like email, mobile number, names as per passport and date of birth.' },
            { icon: '💳', no: '03', title: 'Pay Booking Amount', desc: 'Secure your reservation by submitting the required booking amount through the payment page.' },
            { icon: '🎫', no: '04', title: 'Get Your Ticket', desc: 'Receive your dummy ticket or hotel reservation copy after successful booking processing.' }
          ].map((step, index) => (
            <div className="process-card" key={index}>
              <div className="process-icon">{step.icon}</div>
              <div className="process-no">{step.no}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services">
        <div className="section-heading">
          <span>Our Services</span>
          <h2>Everything you need for your visa travel file</h2>
          <p>
            Flight reservation, hotel reservation, fast processing and support for
            visa documentation.
          </p>
        </div>

        <div className="service-grid">
          {[
            { icon: '✈️', title: 'Flight Reservation', desc: 'Dummy flight reservation with route, date and passenger details.' },
            { icon: '🏨', title: 'Hotel Reservation', desc: 'Hotel booking format for stay proof and visa documentation.' },
            { icon: '⚡', title: 'Fast Processing', desc: 'Quick delivery after form submission and successful payment.' },
            { icon: '📞', title: 'Support', desc: 'Assistance for corrections, dashboard access and booking status.' }
          ].map((service, index) => (
            <div className="info-card" key={index}>
              <div className="info-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="enhanced-section trust-parallel-section">
        <div className="section-heading enhanced-heading left-heading section-heading-narrow">
          <span>Why Customers Choose Us</span>
          <h2>
            More information, better structure and a stronger first impression
          </h2>
          <p>
            We redesigned the home page to look more attractive and informative.
            Important points are now shown in a parallel layout, so some
            information starts from the left, some appears in the middle, and the
            page feels more premium and balanced.
          </p>
        </div>

        <div className="parallel-feature-grid">
          <article className="parallel-card parallel-card-primary">
            <div className="parallel-number">01</div>
            <h3>Our Work & Our Clients</h3>
            <p>
              We provide clean flight reservations, hotel booking formats and
              package reservations for customers who need fast and reliable travel
              documentation support.
            </p>
            <div className="rating-stack">
              <div>
                <strong>4.8</strong>
                <span>Trustpilot rating based on 1100+ reviews</span>
              </div>
              <div>
                <strong>4.8</strong>
                <span>Google rating based on 500+ reviews</span>
              </div>
            </div>
          </article>

          {[
            { no: '02', title: '24×7 Assistance', desc: 'Stuck at the airport and need a ticket immediately? We understand. That is why we stay available 24 hours a day and 7 days a week.' },
            { no: '03', title: 'Live PNR Style Reservation', desc: 'We provide reservation documents in a professional airline-style format so customers receive a clean and easy-to-read itinerary.' },
            { no: '04', title: 'Competitive Pricing', desc: 'We offer dummy booking services at competitive pricing, with rates shown from your admin settings and quick turnaround after payment.' }
          ].map((item, index) => (
            <article className="parallel-card" key={index}>
              <div className="parallel-number">{item.no}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Plans Section */}
      <section className="enhanced-section plans-section plans-section-refined">
        <div className="section-heading enhanced-heading">
          <span>Choose Among Best Plans</span>
          <h2>Dummy Ticket &amp; Dummy Hotel Booking Plans</h2>
          <p>
            Plan prices below are connected with your settings table. If you
            change pricing from admin settings, the same values will show here
            automatically.
          </p>
        </div>

        <div className="plan-grid plan-grid-four">
          <div className="plan-card plan-card-refined">
            <div className="plan-icon">✈️</div>
            <h3>Dummy Flight Ticket</h3>
            <div className="plan-price">₹599</div>
            <p className="plan-subtext">Verifiable flight reservation format</p>
            <ul>
              <li>Maximum of 3 flight routes</li>
              <li>Useful for travel documentation support</li>
              <li>Urgent delivery between 30 to 60 minutes</li>
              <li>Simple booking flow with dashboard tracking</li>
            </ul>
            <button type="button" onClick={() => scrollToSearch('flight')}>
              Buy Now
            </button>
          </div>

          <div className="plan-card plan-card-refined popular">
            <div className="popular-tag">Popular</div>
            <div className="plan-icon">🌍</div>
            <h3>Dummy Hotel & Flight Ticket</h3>
            <div className="plan-price">₹699</div>
            <p className="plan-subtext">Flight and hotel reservation in one order</p>
            <ul>
              <li>All dummy flight ticket benefits</li>
              <li>All dummy hotel booking benefits</li>
              <li>Package pricing from settings</li>
              <li>Urgent delivery between 30 to 60 minutes</li>
            </ul>
            <button type="button" onClick={() => scrollToSearch('both')}>
              Buy Now
            </button>
          </div>

          <div className="plan-card plan-card-refined">
            <div className="plan-icon">🏨</div>
            <h3>Dummy Hotel Booking</h3>
            <div className="plan-price">₹299</div>
            <p className="plan-subtext">Hotel reservation format for travel use</p>
            <ul>
              <li>Up to 3 hotel entries</li>
              <li>Check-in and check-out support</li>
              <li>Suitable for hotel-only travel plan</li>
              <li>Urgent delivery between 30 to 60 minutes</li>
            </ul>
            <button type="button" onClick={() => scrollToSearch('hotel')}>
              Buy Now
            </button>
          </div>

          <div className="plan-card plan-card-refined premium-plan">
            <div className="plan-icon">🎫</div>
            <h3>Return Flight Ticket with E-Ticket Number</h3>
            <div className="plan-price">On Request</div>
            <p className="plan-subtext">Premium manual support service</p>
            <ul>
              <li>Confirmed flight ticket with e-ticket number</li>
              <li>Maximum of 1 PNR / sector</li>
              <li>Manual processing support</li>
              <li>Delivery timeline shared after request</li>
            </ul>
            <button type="button" onClick={() => scrollToSearch('flight')}>
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Airline Logos */}
      <section className="enhanced-section airline-logo-section">
        <div className="section-heading enhanced-heading">
          <span>Airline Samples</span>
          <h2>Popular airline-style booking sample formats</h2>
          <p>
            Airline logos are loaded from your local images/airlines folder for
            faster loading and better reliability.
          </p>
        </div>

        <div className="airline-logo-marquee">
          <div className="airline-logo-track">
            {[...airlines, ...airlines].map((airline, index) => (
              <div className="airline-logo-item" key={index}>
                <img src={airline.src} alt={airline.name} loading="lazy" />
                <span>{airline.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Preview */}
      <section className="enhanced-section reservation-preview-section">
        <div className="reservation-layout">
          <div className="reservation-copy">
            <span className="section-badge">Reservation Preview</span>
            <h2>Professional airline-style reservation preview</h2>
            <p>
              This section shows a realistic preview style so the website looks
              more trustworthy and customers get a clearer idea of the final
              reservation layout.
            </p>
            <div className="reservation-points">
              <span>Airline-style layout</span>
              <span>Passenger information</span>
              <span>Route and timing details</span>
              <span>Easy to read format</span>
            </div>
            <div className="reservation-note-card">
              <h3>What customers get</h3>
              <p>
                Reservation preview, route details, passenger formatting, delivery
                timeline, and dashboard-based order tracking in one smooth booking
                flow.
              </p>
            </div>
          </div>

          <div className="reservation-visual">
            <div className="reservation-frame reservation-frame-small">
              <div className="reservation-frame-head compact-preview-head">
                <strong>Reservation Preview</strong>
                <span className="preview-badge">Sample</span>
              </div>
              <img
                src="/images/reservation-preview-sample.png"
                alt="Reservation Preview Sample"
                className="reservation-preview-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="section-heading">
          <span>Reviews</span>
          <h2>Trusted by travellers</h2>
          <p>
            Real feedback from customers using our fast travel reservation
            support.
          </p>
        </div>

        <div className="testimonial-grid">
          {[
            { text: 'Very fast service and clean booking format.', author: 'Rahul Sharma' },
            { text: 'Perfect for visa documentation and easy process.', author: 'Anita Verma' },
            { text: 'Mobile form is simple and support helped quickly.', author: 'Mohit Arora' }
          ].map((testimonial, index) => (
            <div className="testimonial" key={index}>
              <div className="stars">★★★★★</div>
              <p>{testimonial.text}</p>
              <b>— {testimonial.author}</b>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-soft faq-modern-section" id="faq">
        <div className="section-heading enhanced-heading">
          <span>FAQ</span>
          <h2>Frequently asked questions</h2>
          <p>
            Quick answers about dummy flight tickets, hotel reservations, delivery
            and support.
          </p>
        </div>

        <div className="faq-modern-grid">
          <div className="faq-column">
            {faqData.slice(0, 6).map((faq, index) => (
              <div 
                className={`faq-modern-item ${activeFaq === index ? 'active' : ''}`} 
                onClick={() => toggleFAQ(index)}
                key={index}
              >
                <div className="faq-check"></div>
                <h3>{faq.q}</h3>
                <div className="faq-modern-answer">{faq.a}</div>
              </div>
            ))}
          </div>

          <div className="faq-column">
            {faqData.slice(6).map((faq, index) => {
              const faqIndex = 6 + index;
              return (
                <div 
                  className={`faq-modern-item ${activeFaq === faqIndex ? 'active' : ''}`} 
                  onClick={() => toggleFAQ(faqIndex)}
                  key={faqIndex}
                >
                  <div className="faq-check"></div>
                  <h3>{faq.q}</h3>
                  <div className="faq-modern-answer">{faq.a}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Elements */}
      <a className="whatsapp-float" href="https://wa.me/918800337447" target="_blank" rel="noopener noreferrer">☏</a>
      <button className="scroll-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑
      </button>

      {/* Scripts */}
      <Script src="/js/index-calendarfba4.js?v=1783498721" strategy="afterInteractive" />
      
      <Script id="visibility-script" strategy="afterInteractive">
        {`
          document.addEventListener("visibilitychange", function () {
            if (!document.hidden) {
              if (typeof applyWebsiteMinDateToAllCalendars === 'function') {
                applyWebsiteMinDateToAllCalendars();
              }
              if (typeof refreshMultiCityDateLocks === 'function') {
                refreshMultiCityDateLocks();
              }
              if (typeof runRealtimeValidation === 'function') {
                runRealtimeValidation(true);
              }
            }
          });
        `}
      </Script>

      <Script id="main-script" strategy="afterInteractive">
        {`
          /* ================= COMMON HELPERS ================= */

          /* ================= SAME DAY BOOKING CUT-OFF ================= */
          const SAME_DAY_BOOKING_CUTOFF_HOUR = 23;
          const SAME_DAY_BOOKING_CUTOFF_MINUTE = 0;

          function pad2(n) {
            return String(n).padStart(2, "0");
          }

          function formatDateYMD(date) {
            return (
              date.getFullYear() +
              "-" +
              pad2(date.getMonth() + 1) +
              "-" +
              pad2(date.getDate())
            );
          }

          function getWebsiteMinimumTravelDate() {
            const now = new Date();
            const min = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            if (
              now.getHours() > SAME_DAY_BOOKING_CUTOFF_HOUR ||
              (now.getHours() === SAME_DAY_BOOKING_CUTOFF_HOUR &&
                now.getMinutes() >= SAME_DAY_BOOKING_CUTOFF_MINUTE)
            ) {
              min.setDate(min.getDate() + 1);
            }

            return min;
          }

          function getWebsiteMinimumTravelDateYMD() {
            return formatDateYMD(getWebsiteMinimumTravelDate());
          }

          function setCalendarMinDate(input, minDateValue) {
            if (!input) return;

            const minDate = minDateValue || getWebsiteMinimumTravelDateYMD();

            input.setAttribute("data-min-date", minDate);

            if (input._flatpickr) {
              input._flatpickr.set("minDate", minDate);

              const selected =
                input._flatpickr.selectedDates && input._flatpickr.selectedDates[0]
                  ? input._flatpickr.selectedDates[0]
                  : null;

              if (selected) {
                const selectedOnly = new Date(
                  selected.getFullYear(),
                  selected.getMonth(),
                  selected.getDate(),
                ).getTime();
                const minOnly = dateOnlyTime(minDate);

                if (minOnly !== null && selectedOnly < minOnly) {
                  input._flatpickr.clear();
                  input.value = "";
                }
              }
            }
          }

          function applyWebsiteMinDateToAllCalendars() {
            const minDate = getWebsiteMinimumTravelDateYMD();

            document
              .querySelectorAll(
                ".date-input, #departureDate, #returnDate, .multiDate, .checkin, .checkout",
              )
              .forEach(function (input) {
                setCalendarMinDate(input, minDate);
              });
          }

          function byId(id) {
            return document.getElementById(id);
          }

          function showError(message) {
            const error = byId("formError");
            if (!error) return;
            error.textContent = message || "";
            error.style.display = message ? "block" : "none";
          }

          function clearAllFieldErrors() {
            document
              .querySelectorAll(".field-error-bubble")
              .forEach((el) => el.remove());
            document
              .querySelectorAll(".field-error")
              .forEach((el) => el.classList.remove("field-error"));
          }

          function setInlineError(input, message) {
            if (!input || !message) return;

            const field = input.closest(".field-card");
            if (!field) return;

            field.classList.add("field-error");

            const old = field.querySelector(".field-error-bubble");
            if (old) old.remove();

            const bubble = document.createElement("div");
            bubble.className = "field-error-bubble";
            bubble.innerHTML =
              '<span class="error-icon">!</span><span>' + message + "</span>";
            field.appendChild(bubble);
          }

          function normalizeText(value) {
            return String(value || "")
              .trim()
              .replace(/\\s+/g, " ");
          }

          function extractAirportCode(value) {
            const text = normalizeText(value).toUpperCase();
            const match = text.match(/\\(([A-Z0-9]{3,5})\\)\\s*$/);
            if (match && match[1]) return match[1];
            return text;
          }

          function sameAirport(a, b) {
            const aa = extractAirportCode(a);
            const bb = extractAirportCode(b);
            return aa !== "" && bb !== "" && aa === bb;
          }

          function parseTravelDate(value) {
            const text = normalizeText(value);
            if (text === "") return null;

            let m = text.match(/^(\\d{4})-(\\d{2})-(\\d{2})$/);
            if (m) {
              return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
            }

            m = text.match(/^(\\d{2})[-\\/](\\d{2})[-\\/](\\d{4})$/);
            if (m) {
              return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
            }

            const d = new Date(text);
            if (isNaN(d.getTime())) return null;

            return new Date(d.getFullYear(), d.getMonth(), d.getDate());
          }

          function dateOnlyTime(value) {
            const d = parseTravelDate(value);
            return d ? d.getTime() : null;
          }

          function todayOnlyTime() {
            return getWebsiteMinimumTravelDate().getTime();
          }

          function isPastDate(value) {
            const t = dateOnlyTime(value);
            return t !== null && t < todayOnlyTime();
          }

          function addError(errors, input, message) {
            if (message && !errors.includes(message)) {
              errors.push(message);
            }
            setInlineError(input, message);
          }

          function validateAirportPair(fromInput, toInput, errors) {
            if (!fromInput || !toInput) return;

            const fromVal = normalizeText(fromInput.value);
            const toVal = normalizeText(toInput.value);

            if (fromVal !== "" && toVal !== "" && sameAirport(fromVal, toVal)) {
              const msg = "From & To airports cannot be the same";
              setInlineError(toInput, msg);
              const fromField = fromInput.closest(".field-card");
              if (fromField) {
                fromField.classList.remove("field-error");
                fromField
                  .querySelectorAll(".field-error-bubble")
                  .forEach((el) => el.remove());
              }
              if (!errors.includes(msg)) errors.push(msg);
            }
          }

          function validateNoPast(input, errors, label) {
            if (
              input &&
              normalizeText(input.value) !== "" &&
              isPastDate(input.value)
            ) {
              addError(errors, input, label + " cannot be in the past");
            }
          }

          function validateDateAfter(startInput, endInput, errors, message) {
            if (!startInput || !endInput) return;

            const startVal = normalizeText(startInput.value);
            const endVal = normalizeText(endInput.value);

            if (startVal === "" || endVal === "") return;

            const start = dateOnlyTime(startVal);
            const end = dateOnlyTime(endVal);

            if (start !== null && end !== null && end <= start) {
              addError(errors, endInput, message);
            }
          }

          function maxDateYMD(dateA, dateB) {
            const a = dateOnlyTime(dateA);
            const b = dateOnlyTime(dateB);

            if (a === null) return dateB;
            if (b === null) return dateA;

            return a >= b ? dateA : dateB;
          }

          function refreshMultiCityDateLocks() {
            const rows = Array.from(document.querySelectorAll(".multi-flight"));

            rows.forEach((row, index) => {
              const dateInput = row.querySelector(".multiDate");
              const dateField = dateInput ? dateInput.closest(".field-card") : null;

              if (!dateInput) return;

              if (index === 0) {
                dateInput.disabled = false;
                dateInput.placeholder = "Select date";
                dateField?.classList.remove("validation-disabled");
                setCalendarMinDate(dateInput, getWebsiteMinimumTravelDateYMD());
                return;
              }

              const previousDateInput = rows[index - 1].querySelector(".multiDate");
              const previousDateValue = normalizeText(previousDateInput?.value);

              if (previousDateValue === "") {
                dateInput.value = "";
                dateInput.disabled = true;
                dateInput.placeholder = "Select previous route date first";
                dateField?.classList.add("validation-disabled");
                return;
              }

              dateInput.disabled = false;
              dateInput.placeholder = "Select date";
              dateField?.classList.remove("validation-disabled");

              setCalendarMinDate(
                dateInput,
                maxDateYMD(previousDateValue, getWebsiteMinimumTravelDateYMD())
              );

              const currentTime = dateOnlyTime(dateInput.value);
              const previousTime = dateOnlyTime(previousDateValue);

              if (
                currentTime !== null &&
                previousTime !== null &&
                currentTime < previousTime
              ) {
                dateInput.value = "";
                if (dateInput._flatpickr) {
                  dateInput._flatpickr.clear();
                }
              }
            });
          }

          function validateMultiCity(errors) {
            const seenRoutes = {};
            let previousDate = null;

            document.querySelectorAll(".multi-flight").forEach((row, index) => {
              const f = row.querySelector(".multiFrom");
              const t = row.querySelector(".multiTo");
              const d = row.querySelector(".multiDate");

              validateAirportPair(f, t, errors);
              validateNoPast(d, errors, "Route " + (index + 1) + " date");

              const fromCode = extractAirportCode(f?.value);
              const toCode = extractAirportCode(t?.value);
              const dateVal = normalizeText(d?.value);
              const dateTime = dateOnlyTime(dateVal);

              if (fromCode && toCode && dateVal) {
                const key = fromCode + ">" + toCode + "@" + dateVal;
                if (seenRoutes[key]) {
                  const msg = "Same route with same date cannot be added again";
                  setInlineError(f, msg);
                  setInlineError(t, msg);
                  setInlineError(d, msg);
                  if (!errors.includes(msg)) errors.push(msg);
                }
                seenRoutes[key] = true;
              }

              if (
                previousDate !== null &&
                dateTime !== null &&
                dateTime < previousDate
              ) {
                addError(
                  errors,
                  d,
                  "Route date must be same or after previous route date"
                );
              }

              if (dateTime !== null) {
                previousDate = dateTime;
              }
            });
          }

          function validateHotelRows(errors) {
            const hotelStays = [];

            document.querySelectorAll(".hotel-row").forEach((row, index) => {
              const city = row.querySelector(".hotelCity");
              const cin = row.querySelector(".checkin");
              const cout = row.querySelector(".checkout");

              validateNoPast(cin, errors, "Hotel check-in date");
              validateDateAfter(
                cin,
                cout,
                errors,
                "Check-out date must be after check-in date"
              );

              const cityVal = normalizeText(city?.value).toLowerCase();
              const start = dateOnlyTime(cin?.value);
              const end = dateOnlyTime(cout?.value);

              if (cityVal && start !== null && end !== null) {
                for (const oldStay of hotelStays) {
                  const overlap =
                    cityVal === oldStay.city &&
                    start < oldStay.end &&
                    end > oldStay.start;
                  if (overlap) {
                    const msg = "Hotel dates overlap for the same city/hotel";
                    setInlineError(city, msg);
                    setInlineError(cin, msg);
                    setInlineError(cout, msg);
                    if (!errors.includes(msg)) errors.push(msg);
                    break;
                  }
                }

                hotelStays.push({
                  city: cityVal,
                  start: start,
                  end: end,
                });
              }
            });
          }

          function runRealtimeValidation(silent) {
            const service = byId("service_type")
              ? byId("service_type").value
              : "flight";
            const tripType = document.querySelector('input[name="tripType"]:checked')?.value || "oneway";
            const errors = [];

            clearAllFieldErrors();
            refreshMultiCityDateLocks();

            if (service === "flight" || service === "both") {
              if (tripType !== "multicity") {
                const fromCity = byId("fromCity");
                const toCity = byId("toCity");
                const departureDate = byId("departureDate");
                const returnDate = byId("returnDate");

                validateAirportPair(fromCity, toCity, errors);
                validateNoPast(departureDate, errors, "Departure date");

                if (tripType === "roundtrip") {
                  validateNoPast(returnDate, errors, "Return date");
                  validateDateAfter(
                    departureDate,
                    returnDate,
                    errors,
                    "Return date must be after departure date"
                  );
                }
              } else {
                validateMultiCity(errors);
              }
            }

            if (service === "hotel" || service === "both") {
              validateHotelRows(errors);
            }

            if (errors.length > 0) {
              showError("");
              return false;
            }

            showError("");
            return true;
          }

          function validateRequiredOnSubmit(errors) {
            const service = byId("service_type").value;
            const tripType = document.querySelector('input[name="tripType"]:checked')?.value || "oneway";

            function mark(input, message) {
              addError(errors, input, message);
            }

            if (service === "flight" || service === "both") {
              if (tripType !== "multicity") {
                if (byId("fromCity").value.trim() === "")
                  mark(byId("fromCity"), "Please select From airport");
                if (byId("toCity").value.trim() === "")
                  mark(byId("toCity"), "Please select To airport");
                if (byId("departureDate").value.trim() === "")
                  mark(byId("departureDate"), "Please select departure date");
                if (
                  tripType === "roundtrip" &&
                  byId("returnDate").value.trim() === ""
                )
                  mark(byId("returnDate"), "Please select return date");
              } else {
                document.querySelectorAll(".multi-flight").forEach((row, index) => {
                  const f = row.querySelector(".multiFrom");
                  const t = row.querySelector(".multiTo");
                  const d = row.querySelector(".multiDate");

                  if (f.value.trim() === "") mark(f, "Please select From airport");
                  if (t.value.trim() === "") mark(t, "Please select To airport");
                  if (d.value.trim() === "") mark(d, "Please select route date");
                });
              }
            }

            if (service === "hotel" || service === "both") {
              document.querySelectorAll(".hotel-row").forEach((row) => {
                const city = row.querySelector(".hotelCity");
                const cin = row.querySelector(".checkin");
                const cout = row.querySelector(".checkout");

                if (city.value.trim() === "")
                  mark(city, "Please select city/hotel");
                if (cin.value.trim() === "")
                  mark(cin, "Please select check-in date");
                if (cout.value.trim() === "")
                  mark(cout, "Please select check-out date");
              });
            }
          }

          // Event listeners for instant validation
          document.addEventListener("input", function (e) {
            if (
              e.target.id === "fromCity" ||
              e.target.id === "toCity" ||
              e.target.id === "departureDate" ||
              e.target.id === "returnDate" ||
              e.target.classList.contains("multiFrom") ||
              e.target.classList.contains("multiTo") ||
              e.target.classList.contains("multiDate") ||
              e.target.classList.contains("hotelCity") ||
              e.target.classList.contains("checkin") ||
              e.target.classList.contains("checkout")
            ) {
              runRealtimeValidation(true);
            }
          });

          document.addEventListener("change", function (e) {
            if (
              e.target.name === "tripType" ||
              e.target.id === "fromCity" ||
              e.target.id === "toCity" ||
              e.target.id === "departureDate" ||
              e.target.id === "returnDate" ||
              e.target.classList.contains("multiFrom") ||
              e.target.classList.contains("multiTo") ||
              e.target.classList.contains("multiDate") ||
              e.target.classList.contains("hotelCity") ||
              e.target.classList.contains("checkin") ||
              e.target.classList.contains("checkout")
            ) {
              runRealtimeValidation(true);
            }
          });

          document.addEventListener("click", function (e) {
            if (e.target.closest(".suggestion-item")) {
              setTimeout(function () {
                runRealtimeValidation(true);
              }, 30);
            }
          });

          byId("searchForm").addEventListener("submit", function (e) {
            const errors = [];
            clearAllFieldErrors();

            validateRequiredOnSubmit(errors);
            const liveOk = runRealtimeValidation(true);

            if (errors.length > 0 || !liveOk) {
              e.preventDefault();
              if (errors.length > 0) {
                showError(errors[0]);
              }
              return;
            }

            showError("");
          });

          refreshMultiCityDateLocks();

          // Airport and Hotel search functions
          function fetchAirports(query, box) {
            if (!box) return;
            if (query.trim().length < 2) {
              box.innerHTML = "";
              return;
            }

            box.innerHTML = '<div class="suggestion-loading">Searching...</div>';

            fetch("/airport_search03d2.json?q=" + encodeURIComponent(query.trim()))
              .then((res) => res.json())
              .then((data) => {
                box.innerHTML = "";
                if (!Array.isArray(data) || data.length === 0) {
                  box.innerHTML =
                    '<div class="suggestion-empty">No airport found</div>';
                  return;
                }
                data.forEach((item) => {
                  const div = document.createElement("div");
                  div.className = "suggestion-item";
                  div.innerHTML = \`<strong>\${item.city || ""}</strong> <em>\${item.airportCode || ""}</em><br><span>\${item.airportDescription || ""}</span>\`;
                  div.onclick = function () {
                    const wrapper = box.closest(".autocomplete-box");
                    wrapper.querySelector("input").value =
                      (item.city || "") + " (" + (item.airportCode || "") + ")";
                    box.innerHTML = "";
                    if (typeof runRealtimeValidation === "function") {
                      runRealtimeValidation(true);
                    }
                    setTimeout(function () {
                      if (typeof runRealtimeValidation === "function") {
                        runRealtimeValidation(false);
                      }
                      if (typeof refreshMultiCityDateLocks === "function") {
                        refreshMultiCityDateLocks();
                      }
                    }, 20);
                  };
                  box.appendChild(div);
                });
              })
              .catch(() => {
                box.innerHTML =
                  '<div class="suggestion-empty">Unable to search airport</div>';
              });
          }

          function fetchHotels(query, box) {
            if (!box) return;
            if (query.trim().length < 2) {
              box.innerHTML = "";
              return;
            }

            box.innerHTML = '<div class="suggestion-loading">Searching...</div>';

            fetch("/hotel_search03d2.json?q=" + encodeURIComponent(query.trim()))
              .then((res) => res.json())
              .then((data) => {
                box.innerHTML = "";
                if (!Array.isArray(data) || data.length === 0) {
                  box.innerHTML =
                    '<div class="suggestion-empty">No hotel/city found</div>';
                  return;
                }
                data.forEach((item) => {
                  const div = document.createElement("div");
                  div.className = "suggestion-item";
                  div.innerHTML = \`<strong>\${item.name || ""}</strong><br><span>\${item.countryName || ""}</span>\`;
                  div.onclick = function () {
                    const wrapper = box.closest(".autocomplete-box");
                    wrapper.querySelector("input").value =
                      (item.name || "") + ", " + (item.countryName || "");
                    box.innerHTML = "";
                    if (typeof runRealtimeValidation === "function") {
                      runRealtimeValidation(true);
                    }
                    setTimeout(function () {
                      if (typeof runRealtimeValidation === "function") {
                        runRealtimeValidation(false);
                      }
                    }, 20);
                  };
                  box.appendChild(div);
                });
              })
              .catch(() => {
                box.innerHTML =
                  '<div class="suggestion-empty">Unable to search hotel</div>';
              });
          }

          // Input listener for search
          let searchTimer = null;
          document.addEventListener("input", function (e) {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
              if (e.target.id === "fromCity")
                fetchAirports(e.target.value, byId("fromList"));
              if (e.target.id === "toCity")
                fetchAirports(e.target.value, byId("toList"));
              if (
                e.target.classList.contains("multiFrom") ||
                e.target.classList.contains("multiTo")
              ) {
                fetchAirports(
                  e.target.value,
                  e.target.parentElement.querySelector(".suggestions")
                );
              }
              if (e.target.classList.contains("hotelCity")) {
                fetchHotels(
                  e.target.value,
                  e.target.parentElement.querySelector(".suggestions")
                );
              }
            }, 220);
          });

          // Close suggestions on click outside
          document.addEventListener("click", function (e) {
            if (!e.target.closest(".autocomplete-box")) {
              document
                .querySelectorAll(".suggestions")
                .forEach((el) => (el.innerHTML = ""));
            }
          });

          // Expose functions to global scope
          window.switchTripType = function(type) {
            const returnWrap = byId("returnDateWrap");
            const multiSection = byId("multiCitySection");
            const flightSingle = byId("flightSingle");
            
            if (returnWrap) returnWrap.style.display = type === "roundtrip" ? "block" : "none";
            if (multiSection) multiSection.style.display = type === "multicity" ? "block" : "none";
            if (flightSingle) flightSingle.style.display = type === "multicity" ? "none" : "grid";
            
            document.querySelectorAll(".trip-pill").forEach(label => {
              const input = label.querySelector("input");
              if (input) label.classList.toggle("active", input.checked);
            });
            
            refreshMultiCityDateLocks();
            runRealtimeValidation(true);
          };

          window.swapCities = function() {
            const from = byId("fromCity");
            const to = byId("toCity");
            const temp = from.value;
            from.value = to.value;
            to.value = temp;
            runRealtimeValidation(true);
          };

          window.applyWebsiteMinDateToAllCalendars = applyWebsiteMinDateToAllCalendars;
          window.refreshMultiCityDateLocks = refreshMultiCityDateLocks;
          window.runRealtimeValidation = runRealtimeValidation;
          window.initDatePickers = function(container) {
            // Initialize date pickers if flatpickr is available
            if (typeof flatpickr !== 'undefined') {
              const inputs = container.querySelectorAll('.date-input');
              inputs.forEach(input => {
                if (!input._flatpickr) {
                  flatpickr(input, {
                    dateFormat: 'Y-m-d',
                    minDate: getWebsiteMinimumTravelDateYMD(),
                    disableMobile: true
                  });
                }
              });
            }
          };
        `}
      </Script>

      <Script id="visitor-session" strategy="afterInteractive">
        {`
          window.DF_VISITOR_SESSION_KEY = "SES-20260708081701-c0926612cd";
          (function () {
            function send(type) {
              try {
                var fd = new FormData();
                fd.append("session_key", window.DF_VISITOR_SESSION_KEY || "");
                fd.append("event_type", type || "ping");
                if (navigator.sendBeacon) {
                  navigator.sendBeacon("/visitor_exit.html", fd);
                } else {
                  fetch("/visitor_exit.html", {
                    method: "POST",
                    body: fd,
                    keepalive: true,
                  });
                }
              } catch (e) {}
            }
            window.addEventListener("pagehide", function () {
              send("exit");
            });
            window.addEventListener("beforeunload", function () {
              send("exit");
            });
            setInterval(function () {
              send("ping");
            }, 30000);
          })();
        `}
      </Script>
    </>
  );
}