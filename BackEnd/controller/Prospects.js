const axios = require('axios');

exports.scanProspects = async (req, res) => {
  const { query, latitude, longitude } = req.body;

  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  // If no API key is configured, return an error
  if (!apiKey) {
    console.error("GOOGLE_PLACES_API_KEY is missing.");
    return res.status(500).json({
      message: "Server Configuration Error: GOOGLE_PLACES_API_KEY is missing in .env file."
    });
  }

  try {
    const params = {
      query: query,
      key: apiKey,
    };

    // Add location biasing if coordinates are provided
    if (latitude && longitude) {
      params.location = `${latitude},${longitude}`;
      params.radius = 5000; // 5km radius
    }

    // Using Google Places Text Search API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      { params }
    );

    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
      throw new Error(`Google API Error: ${response.data.status}`);
    }

    const results = response.data.results.map((place) => transformPlaceToProspect(place, apiKey));
    
    res.json({ results });

  } catch (error) {
    console.error("Error fetching prospects:", error.message);
    res.status(500).json({ message: "Failed to fetch prospects", error: error.message });
  }
};

// Helper to transform Google Place data to our Prospect model
function transformPlaceToProspect(place, apiKey) {
  const hasWebsite = false; // Text Search doesn't return website, would need Details API
  const rating = place.rating || 0;
  const reviewCount = place.user_ratings_total || 0;
  
  // Calculate a mock "Lead Score" based on available data
  // e.g. Low rating + high review count might mean they need reputation management
  // No website (if we knew) would be high score
  let score = 70;
  if (rating < 4.0) score += 10;
  if (reviewCount > 50) score += 5;

  return {
    id: place.place_id,
    name: place.name,
    verified: !!place.plus_code, // Mock proxy for verification
    address: place.formatted_address,
    phone: "N/A", // Requires Place Details API
    email: "N/A", // Not available in Places API usually
    type: place.types[0] ? place.types[0].replace('_', ' ').toUpperCase() : "BUSINESS",
    tags: [
      rating ? `${rating} Stars` : "No Rating",
      reviewCount ? `${reviewCount} Reviews` : "New",
      place.business_status || "OPERATIONAL"
    ],
    submissionTime: "Just now",
    submissionSource: "Google Places",
    submissionCount: 1,
    value: rating < 4.0 ? "Reputation Opp" : "High Value",
    priceHistory: `${reviewCount} Reviews`, // Mapping to UI field
    equity: "Unknown Site", // Mapping to UI field
    lastEngagement: "Never",
    clicks: 0,
    opens: 0,
    scans: 1,
    lastAction: "Identified",
    salesLikelihood: score,
    contactHealth: Math.floor(rating * 20), // Mock health based on rating
    agents: [],
    avatar: place.icon || "https://ui-avatars.com/api/?background=random",
    status: "New",
    mapImage: `https://maps.googleapis.com/maps/api/staticmap?center=${place.geometry.location.lat},${place.geometry.location.lng}&zoom=15&size=200x200&markers=color:red%7C${place.geometry.location.lat},${place.geometry.location.lng}&key=${apiKey}`
  };
}


