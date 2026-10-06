import React from 'react';

export const AlertBanner = ({
  type = 'info', // 'success' | 'error' | 'info'
  message,
  onClose,
  className = '',
}) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type} ${className}`.trim()} role="alert">
      <div className="flex items-center gap-2">
        <span>{type === 'success' ? '✓' : type === 'error' ? '!' : 'ℹ'}</span>
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            fontSize: '1.2rem',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '0 0.25rem',
          }}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default AlertBanner;

