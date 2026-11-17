import { useEffect, useRef } from 'react';
import L from 'leaflet';

import { MAP_MAX_ZOOM } from '@/const';
import type { Offer } from '@/types/offer';

interface MapProps {
  offers: Offer[];
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

export const Map = ({ offers, city, activeOfferId = null, className = 'cities__map map' }: MapProps) => {
  const mapContainerRef = useRef<HTMLElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<{ offerId: Offer['id']; marker: L.Marker }[]>([]);

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
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;

    if (!map || !markersLayer) {
      return;
    }

    markersLayer.clearLayers();
    markersRef.current = offers.map((offer) => {
      const marker = L.marker([offer.location.latitude, offer.location.longitude], { icon: defaultIcon })
        .addTo(markersLayer)
        .bindPopup(offer.title);
      return { offerId: offer.id, marker };
    });
  }, [offers]);

  useEffect(() => {
    markersRef.current.forEach(({ offerId, marker }) => {
      marker.setIcon(offerId === activeOfferId ? activeIcon : defaultIcon);
    });
  }, [activeOfferId, offers]);

  return <section className={className} ref={mapContainerRef} aria-label="Map of rental offers" />;
};
