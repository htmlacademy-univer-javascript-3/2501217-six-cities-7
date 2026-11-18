import './spinner.css';

export const Spinner = () => (
  <div className="spinner" role="status">
    <span className="spinner__indicator" aria-hidden="true" />
    <span>Loading offers...</span>
  </div>
);
