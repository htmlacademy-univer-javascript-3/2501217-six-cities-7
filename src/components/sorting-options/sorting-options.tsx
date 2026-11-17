import { useEffect, useRef, useState } from 'react';

import { SortType } from '@/const';
import type { Sorting } from '@/types/sorting';
import './sorting-options.css';

interface SortingOptionsProps {
  sorting: Sorting;
  onSortingChange: (sorting: Sorting) => void;
}

export const SortingOptions = ({ sorting, onSortingChange }: SortingOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !sortingRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSortingChange = (option: Sorting) => {
    onSortingChange(option);
    setIsOpen(false);
  };

  return (
    <div
      className="places__sorting"
      ref={sortingRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <span className="places__sorting-caption">Sort by </span>
      <button
        className="places__sorting-type sorting-options__toggle"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {sorting}
        <svg className="places__sorting-arrow" width="7" height="4" aria-hidden="true">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </button>
      <ul hidden={!isOpen} className={`places__options places__options--custom${isOpen ? ' places__options--opened' : ''}`}>
        {Object.values(SortType).map((option) => (
          <li key={option}>
            <button
              className={`places__option sorting-options__option${option === sorting ? ' places__option--active' : ''}`}
              type="button"
              aria-pressed={option === sorting}
              onClick={() => handleSortingChange(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
