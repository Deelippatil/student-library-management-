import React from 'react';

export const Card = ({ children, title, subtitle, headerAction, className = '', ...props }) => {
  return (
    <div className={`card ${className}`.trim()} {...props}>
      {(title || headerAction) && (
        <div className="card-header">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p className="text-muted" style={{ marginTop: '0.2rem' }}>{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;

