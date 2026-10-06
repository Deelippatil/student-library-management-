import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import studentApi from '../../services/api/studentApi';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import DataTable from '../../components/common/DataTable';
import StockBadge from '../../components/common/StockBadge';
import AlertBanner from '../../components/common/AlertBanner';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { formatDate } from '../../utils/formatters';

export const IssuedBooksPage = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchActiveLoans = async () => {
    try {
      setLoading(true);
      const res = await studentApi.getActiveLoans();
      if (res.success) {
        setLoans(res.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load active loans.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveLoans();
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
      header: 'Issue Date',
      accessor: 'issue_date',
      render: (row) => formatDate(row.issue_date),
    },
    {
      header: 'Due Date',
      accessor: 'due_date',
      render: (row) => (
        <div>
          <div>{formatDate(row.due_date)}</div>
          {row.is_overdue ? (
            <span className="badge badge-overdue" style={{ marginTop: '0.2rem', fontSize: '0.7rem' }}>
              Overdue ({row.days_overdue} days)
            </span>
          ) : (
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
              {row.days_remaining} day(s) remaining
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StockBadge status={row.is_overdue ? 'overdue' : row.status} />,
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Currently Issued Books</h1>
          <p className="text-muted">Books presently in your custody that require return</p>
        </div>
        <Link to="/student/catalog">
          <Button variant="primary">Borrow More Books</Button>
        </Link>
      </div>

      {error && <AlertBanner type="error" message={error} onClose={() => setError('')} />}

      <Card style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-tertiary)' }}>
        <p style={{ fontSize: '0.875rem' }}>
          <strong>Notice on Book Returns:</strong> To return a book, please bring it to the circulation desk. The librarian will inspect the condition of the book and mark the transaction as completed in the system.
        </p>
      </Card>

      {loading ? (
        <Card>
          <LoadingSkeleton rows={4} height="50px" />
        </Card>
      ) : loans.length === 0 ? (
        <EmptyState
          title="No books currently issued"
          description="You do not have any books currently borrowed from the library."
          actionLabel="Browse Catalog"
          onAction={() => window.location.assign('/student/catalog')}
        />
      ) : (
        <DataTable columns={columns} data={loans} keyField="id" />
      )}
    </div>
  );
};

export default IssuedBooksPage;

