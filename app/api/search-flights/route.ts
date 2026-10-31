import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { origin, destination, departureDate, returnDate, tripType } = body;

    // Validate required fields
    if (!origin || !destination || !departureDate) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: origin, destination, departureDate',
      }, { status: 400 });
    }

    // Get Amadeus Access Token
    const tokenResponse = await fetch('https://api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.AMADEUS_CLIENT_ID || '',
        client_secret: process.env.AMADEUS_CLIENT_SECRET || '',
        grant_type: 'client_credentials',
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      return NextResponse.json({
        success: false,
        message: 'Failed to authenticate with Amadeus API',
      }, { status: 401 });
    }

    const accessToken = tokenData.access_token;

    // Search for flights
    let flightSearchUrl = `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1&max=20`;

    if (tripType === 'roundtrip' && returnDate) {
      flightSearchUrl += `&returnDate=${returnDate}`;
    }

    const flightResponse = await fetch(flightSearchUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const flightData = await flightResponse.json();

    // Handle API errors
    if (flightData.errors) {
      return NextResponse.json({
        success: false,
        message: flightData.errors[0]?.detail || 'Error searching flights',
        code: flightData.errors[0]?.code,
      }, { status: 400 });
    }

    // Check if flights exist
    if (!flightData.data || flightData.data.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No flights found for the selected route and date.',
      }, { status: 404 });
    }

    // Process and format flight data
    const formattedFlights = flightData.data.map((offer: any) => {
      const firstSegment = offer.itineraries[0]?.segments[0];
      const lastSegment = offer.itineraries[0]?.segments[offer.itineraries[0]?.segments.length - 1];
      
      const priceInINR = Math.round(parseFloat(offer.price?.total || 0) * 85);
      const duration = offer.itineraries[0]?.duration?.replace('PT', '').replace('H', 'h ').replace('M', 'm') || '';
      
      return {
        id: offer.id,
        airline: offer.validatingAirlineCodes?.[0] || 'Unknown',
        airlineLogo: `/images/airlines/${offer.validatingAirlineCodes?.[0]?.toLowerCase()}.png`,
        origin: firstSegment?.departure?.iataCode || origin,
        destination: lastSegment?.arrival?.iataCode || destination,
        departureTime: firstSegment?.departure?.at?.split('T')[1]?.slice(0, 5) || '',
        arrivalTime: lastSegment?.arrival?.at?.split('T')[1]?.slice(0, 5) || '',
        duration: duration,
        stops: (offer.itineraries[0]?.segments.length || 1) - 1,
        price: priceInINR,
        currency: 'INR',
        bookingCode: offer.id?.slice(-6).toUpperCase(),
        segments: offer.itineraries[0]?.segments.map((segment: any) => ({
          origin: segment.departure.iataCode,
          destination: segment.arrival.iataCode,
          departureTime: segment.departure.at,
          arrivalTime: segment.arrival.at,
          airline: segment.carrierCode,
          flightNumber: segment.number,
          duration: segment.duration?.replace('PT', '').replace('H', 'h ').replace('M', 'm') || '',
        })),
      };
    });

    return NextResponse.json({
      success: true,
      flights: formattedFlights,
      total: flightData.meta?.count || 0,
    });

  } catch (error) {
    console.error('Error searching flights:', error);
    return NextResponse.json({
      success: false,
      message: 'Error searching flights. Please try again.',
    }, { status: 500 });
  }
}