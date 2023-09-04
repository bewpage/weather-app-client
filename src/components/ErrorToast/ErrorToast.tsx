import React from 'react';

interface ErrorToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const ErrorToast = ({ message, show, onClose }: ErrorToastProps) => {
  return (
    <div
      className={`toast align-items-center text-white bg-danger border-0 ${
        show ? 'show' : ''
      }`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          onClick={onClose}></button>
      </div>
    </div>
  );
};

export default ErrorToast;
