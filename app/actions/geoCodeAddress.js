'use server';
import opencage from 'opencage-api-client';
export const geoCodeAddress = async (addressQuery) => {
  try {
    const response = await opencage.geocode({
      q: addressQuery,
      key: process.env.OPENCAGE_API_KEY,
    });
    if (response.results && response.results.length > 0) {
      const { lat, lng } = response.results[0].geometry;
      return { lat, lng };
    }
    console.log('No geocoding results found for the address:', addressQuery);
    return { lat: 43.2994, lng: 74.2179 };
  } catch (error) {
    console.error('Geocoding error:', error);
    return { lat: null, lng: null };
  }
};
