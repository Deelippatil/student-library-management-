import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import studentApi from '../../services/api/studentApi';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import DataTable from '../../components/common/DataTable';
import StockBadge from '../../components/common/StockBadge';
import AlertBanner from '../../components/common/AlertBanner';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { formatDate } from '../../utils/formatters';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await studentApi.getDashboard();
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load student dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const columns = [
    {
      header: 'Book Title',
      accessor: 'book_title',
      render: (row) => (
        <div>
          <span style={{ fontWeight: 600 }}>{row.book_title}</span>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>by {row.book_author}</div>
        </div>
      ),
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
          <span>{formatDate(row.due_date)}</span>
          {row.is_overdue && (
            <span className="badge badge-overdue" style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>
              Overdue
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StockBadge status={row.status} />,
    },
  ];

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSkeleton rows={4} height="60px" />
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Welcome Banner */}
      <div className="page-header">
        <div>
          <h1>Welcome back, {user?.name}</h1>
          <p className="text-muted">
            Student ID: <strong>{user?.student_id || 'STU'}</strong> • Registered Email: {user?.email}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/student/catalog">
            <Button variant="primary">Browse Catalog</Button>
          </Link>
          <Link to="/student/issued-books">
            <Button variant="outline">My Loans</Button>
          </Link>
        </div>
      </div>

      {error && <AlertBanner type="error" message={error} onClose={() => setError('')} />}

      {/* Metric Cards */}
      <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-label">Active Loans</div>
          <div className="stat-value">{data?.active_loans_count ?? 0}</div>
          <div className="stat-desc">Books currently with you</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Overdue Books</div>
          <div className="stat-value">{data?.overdue_loans_count ?? 0}</div>
          <div className="stat-desc">Past scheduled return date</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Returned Books</div>
          <div className="stat-value">{data?.returned_loans_count ?? 0}</div>
          <div className="stat-desc">Completed past borrowings</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Next Due Date</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.5rem', color: 'var(--color-black)' }}>
            {data?.next_due_date ? formatDate(data.next_due_date) : 'None'}
          </div>
          <div className="stat-desc">Upcoming return deadline</div>
        </div>
      </div>

      {/* Recent Activity Card */}
      <Card
        title="Recent Circulation Activity"
        subtitle="Your latest borrowings and returned items"
        headerAction={
          <Link to="/student/history">
            <Button variant="outline" size="sm">
              Full History
            </Button>
          </Link>
        }
      >
        {data?.recent_loans && data.recent_loans.length > 0 ? (
          <DataTable
            columns={columns}
            data={data.recent_loans}
            keyField="id"
          />
        ) : (
          <EmptyState
            title="No activity yet"
            description="You have not borrowed any books yet. Explore the catalog to get started."
            actionLabel="Explore Catalog"
            onAction={() => window.location.assign('/student/catalog')}
          />
        )}
      </Card>
    </div>
  );
};

export default StudentDashboard;

