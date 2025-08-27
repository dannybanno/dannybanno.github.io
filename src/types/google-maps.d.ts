declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
  }

  class Geocoder {
    geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
  }

  class Marker {
    constructor(opts: MarkerOptions);
  }

  interface MapOptions {
    zoom?: number;
    center?: LatLng | LatLngLiteral;
    gestureHandling?: string;
    scrollwheel?: boolean;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
  }

  interface MarkerOptions {
    map: Map;
    position: LatLng | LatLngLiteral;
    animation?: Animation;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface GeocoderRequest {
    address: string;
  }

  interface GeocoderResult {
    geometry: {
      location: LatLng;
    };
  }

  type GeocoderStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';

  enum Animation {
    BOUNCE,
    DROP
  }
}

interface Window {
  initMap: () => void;
  google: typeof google;
} 