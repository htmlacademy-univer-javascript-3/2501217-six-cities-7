import './spinner.css';

interface SpinnerProps {
  message?: string;
}

export const Spinner = ({ message = 'Loading offers...' }: SpinnerProps) => (
  <div className="spinner" role="status">
    <span className="spinner__indicator" aria-hidden="true" />
    <span>{message}</span>
  </div>
);
