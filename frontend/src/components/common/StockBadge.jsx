import React from 'react';

export const StockBadge = ({ availableCopies, totalCopies, status }) => {
  if (status) {
    const s = String(status).toLowerCase();
    if (s === 'issued' || s === 'active') {
      return <span className="badge badge-issued">Issued</span>;
    }
    if (s === 'returned') {
      return <span className="badge badge-returned">Returned</span>;
    }
    if (s === 'overdue') {
      return <span className="badge badge-overdue">Overdue</span>;
    }
    return <span className="badge badge-returned">{status}</span>;
  }

  const available = Number(availableCopies || 0);
  const total = Number(totalCopies || 0);

  if (available > 0) {
    return (
      <span className="badge badge-available" title={`${available} of ${total} copies available`}>
        ● Available ({available}/{total})
      </span>
    );
  }

  return (
    <span className="badge badge-out-of-stock" title="No copies available currently">
      ○ Out of Stock (0/{total})
    </span>
  );
};

export default StockBadge;

