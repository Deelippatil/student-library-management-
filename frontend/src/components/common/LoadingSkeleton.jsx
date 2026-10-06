import React from 'react';

export const LoadingSkeleton = ({
  rows = 4,
  height = '40px',
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`.trim()} aria-busy="true" aria-label="Loading content">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{ height, width: '100%' }}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;

