import React, { useState, useEffect } from 'react';
import studentApi from '../../services/api/studentApi';
import Card from '../../components/common/Card';
import DataTable from '../../components/common/DataTable';
import StockBadge from '../../components/common/StockBadge';
import AlertBanner from '../../components/common/AlertBanner';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { formatDate } from '../../utils/formatters';

export const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await studentApi.getBorrowingHistory();
        if (res.success) {
          setHistory(res.data || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to load borrowing history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const columns = [
    {
      header: 'Book Title',
      accessor: 'book_title',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.book_title}</div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>by {row.book_author}</div>
        </div>
      ),
    },
    {
      header: 'ISBN',
      accessor: 'book_isbn',
      render: (row) => <span className="text-code">{row.book_isbn}</span>,
    },
    {
      header: 'Category',
      accessor: 'book_category',
    },
    {
      header: 'Issue Date',
      accessor: 'issue_date',
      render: (row) => formatDate(row.issue_date),
    },
    {
      header: 'Return Date',
      accessor: 'return_date',
      render: (row) => formatDate(row.return_date),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StockBadge status={row.status} />,
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Borrowing History</h1>
          <p className="text-muted">Complete audit log of all your historical library loans</p>
        </div>
      </div>

      {error && <AlertBanner type="error" message={error} onClose={() => setError('')} />}

      {loading ? (
        <Card>
          <LoadingSkeleton rows={5} height="50px" />
        </Card>
      ) : history.length === 0 ? (
        <EmptyState
          title="No history yet"
          description="You haven't completed any library loan cycles yet."
        />
      ) : (
        <DataTable columns={columns} data={history} keyField="id" />
      )}
    </div>
  );
};

export default HistoryPage;

