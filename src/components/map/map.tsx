import { useEffect, useRef } from 'react';
import L from 'leaflet';

import { MAP_MAX_ZOOM } from '@/const';
import type { Offer } from '@/types/offer';

interface MapProps {
  offers: Offer[];
  city: Offer['city'];
}

const defaultIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

export const Map = ({ offers, city }: MapProps) => {
  const mapContainerRef = useRef<HTMLElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const map = L.map(mapContainerRef.current).setView(
      [city.location.latitude, city.location.longitude],
      city.location.zoom
    );

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
  }, [city.location.latitude, city.location.longitude, city.location.zoom]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;

    if (!map || !markersLayer) {
      return;
    }

    markersLayer.clearLayers();
    offers.forEach((offer) => {
      L.marker([offer.location.latitude, offer.location.longitude], { icon: defaultIcon })
        .addTo(markersLayer)
        .bindPopup(offer.title);
    });
  }, [offers]);

  return <section className="cities__map map" ref={mapContainerRef} aria-label="Map of rental offers" />;
};
