'use client';
import { useEffect, useState } from 'react';
import { setDefaults, fromAddress } from 'react-geocode';
import Map, { Marker } from 'react-map-gl/mapbox';
import Image from 'next/image';
import 'mapbox-gl/dist/mapbox-gl.css';
import pin from '@/assets/images/pin.svg';
import Spinner from './Spinner';
const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 8,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(null);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'in',
  });

  useEffect(() => {
    const fetchGeocode = async () => {
      try {
        const response = await fromAddress(
          `${property.propLocation.street} ${property.propLocation.city} ${property.propLocation.state} ${property.propLocation.zipcode}`
        );
        //check geocode response
        if (response.results && response.results.length > 0) {
          const { lat, lng } = response.results[0].geometry.location;
          console.log('this the lat and lng', lat, lng);
          setLat(lat);
          setLng(lng);
          setViewPort({
            ...viewPort,
            latitude: lat,
            longitude: lng,
            zoom: 8,
            width: '100%',
            height: '500px',
          });
        } else {
          console.log(
            'No geocoding results found for the address:',
            property.propLocation
          );
          setGeocodeError(true);
        }
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchGeocode();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (geocodeError) {
    return <div>Unable to find location for this address.</div>;
  }
  return (
    <Map
      // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 12,
      }}
      style={{ width: '100%', height: '500px' }}
      mapStyle='mapbox://styles/mapbox/standard'>
      <Marker longitude={lng} latitude={lat} anchor='bottom'>
        <Image src={pin} alt='Property Location' width={40} height={40} />
      </Marker>
    </Map>
  );
};

export default PropertyMap;
