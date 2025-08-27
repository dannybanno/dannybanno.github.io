import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  address: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ address }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      // Add passive event listeners
      const options = {
        passive: true
      };

      // Create map instance
      const map = new google.maps.Map(mapRef.current, {
        zoom: 15,
        center: { lat: 0, lng: 0 },
        gestureHandling: 'cooperative',
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });

      mapInstanceRef.current = map;

      // Geocode the address
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);

          // Add marker
          new google.maps.Marker({
            map,
            position: location,
            animation: google.maps.Animation.DROP
          });
        }
      });

      // Add passive event listeners to the map container
      const mapContainer = mapRef.current;
      mapContainer.addEventListener('touchstart', () => {}, options);
      mapContainer.addEventListener('touchmove', () => {}, options);
    };

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      delete window.initMap;
      document.head.removeChild(script);
    };
  }, [address]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-lg shadow-lg"
      style={{ touchAction: 'pan-x pan-y' }}
    />
  );
};

export default GoogleMap; 