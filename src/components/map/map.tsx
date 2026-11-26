import { memo, useEffect, useRef } from 'react';
import L from 'leaflet';

import { MAP_MAX_ZOOM } from '@/const';
import type { Offer } from '@/types/offer';

interface MapProps {
  offers: Pick<Offer, 'id' | 'title' | 'location'>[];
  city: Offer['city'];
  className?: string;
  activeOfferId?: Offer['id'] | null;
}

const defaultIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = L.icon({
  ...defaultIcon.options,
  iconUrl: '/img/pin-active.svg',
});

const OffersMap = ({ offers, city, activeOfferId = null, className = 'cities__map map' }: MapProps) => {
  const mapContainerRef = useRef<HTMLElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<globalThis.Map<Offer['id'], L.Marker>>();
  const activeMarkerRef = useRef<L.Marker | undefined>();

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const map = L.map(mapContainerRef.current);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: MAP_MAX_ZOOM,
    }).addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    mapInstanceRef.current?.setView(
      [city.location.latitude, city.location.longitude],
      city.location.zoom
    );
  }, [city.location.latitude, city.location.longitude, city.location.zoom]);

  useEffect(() => {
    const markersLayer = markersLayerRef.current;

    if (!markersLayer) {
      return;
    }

    markersLayer.clearLayers();
    const markers = new globalThis.Map<Offer['id'], L.Marker>();
    markersRef.current = markers;
    activeMarkerRef.current = undefined;

    for (const offer of offers) {
      const marker = L.marker([offer.location.latitude, offer.location.longitude], { icon: defaultIcon })
        .addTo(markersLayer)
        .bindPopup(offer.title);
      markers.set(offer.id, marker);
    }
  }, [offers]);

  useEffect(() => {
    const activeMarker = activeOfferId === null ? undefined : markersRef.current?.get(activeOfferId);

    if (activeMarkerRef.current !== activeMarker) {
      activeMarkerRef.current?.setIcon(defaultIcon);
      activeMarker?.setIcon(activeIcon);
      activeMarkerRef.current = activeMarker;
    }
  }, [activeOfferId, offers]);

  return <section className={className} ref={mapContainerRef} aria-label="Map of rental offers" />;
};

export const Map = memo(OffersMap);
