import type { City } from '@/types/offer';
import './city-list.css';

interface CityListProps {
  cities: readonly City['name'][];
  currentCity: City['name'];
  onCityChange: (city: City['name']) => void;
}

export const CityList = ({ cities, currentCity, onCityChange }: CityListProps) => (
  <ul className="locations__list tabs__list">
    {cities.map((city) => (
      <li className="locations__item" key={city}>
        <button
          className={`locations__item-link tabs__item city-list__button${city === currentCity ? ' tabs__item--active' : ''}`}
          type="button"
          aria-pressed={city === currentCity}
          onClick={() => onCityChange(city)}
        >
          <span>{city}</span>
        </button>
      </li>
    ))}
  </ul>
);
