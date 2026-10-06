import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import librarianApi from '../../services/api/librarianApi';
import circulationApi from '../../services/api/circulationApi';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import DataTable from '../../components/common/DataTable';
import StockBadge from '../../components/common/StockBadge';
import Modal from '../../components/common/Modal';
import AlertBanner from '../../components/common/AlertBanner';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { formatDate } from '../../utils/formatters';

export const LibrarianDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [banner, setBanner] = useState(null);

  // Quick Return Modal
  const [returningTx, setReturningTx] = useState(null);
  const [returnNotes, setReturnNotes] = useState('');
  const [returnLoading, setReturnLoading] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await librarianApi.getDashboard();
      if (res.success) {
        setData(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load librarian dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleOpenReturn = (tx) => {
    setReturningTx(tx);
    setReturnNotes('Returned in normal condition');
  };

  const handleConfirmReturn = async () => {
    if (!returningTx) return;
    setReturnLoading(true);
    setBanner(null);
    try {
      const res = await circulationApi.returnBook({
        transaction_id: returningTx.id,
        return_notes: returnNotes,
      });

      if (res.success) {
        setBanner({
          type: 'success',
          message: `Book "${returningTx.book_title}" successfully returned! Stock restored.`,
        });
        setReturningTx(null);
        fetchDashboard(); // Refresh stats
      }
    } catch (err) {
      setBanner({
        type: 'error',
        message: err.message || 'Failed to process return.',
      });
    } finally {
      setReturnLoading(false);
    }
  };

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      render: (row) => <span className="text-code">#{row.id}</span>,
      width: '70px',
    },
    {
      header: 'Book',
      accessor: 'book_title',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.book_title}</div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>ISBN: {row.book_isbn}</div>
        </div>
      ),
    },
    {
      header: 'Borrower',
      accessor: 'student_name',
      render: (row) => (
        <div>
          <div>{row.student_name}</div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>{row.student_code}</div>
        </div>
      ),
    },
    {
      header: 'Issue / Due Date',
      render: (row) => (
        <div>
          <div>{formatDate(row.issue_date)}</div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>Due: {formatDate(row.due_date)}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StockBadge status={row.is_overdue ? 'overdue' : row.status} />,
    },
    {
      header: 'Action',
      render: (row) => (
        row.status === 'issued' ? (
          <Button variant="outline" size="sm" onClick={() => handleOpenReturn(row)}>
            Return Book
          </Button>
        ) : (
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>Completed</span>
        )
      ),
    },
  ];

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSkeleton rows={4} height="70px" />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Librarian Console</h1>
          <p className="text-muted">Master library circulation and catalog administration</p>
        </div>
        <div className="flex gap-2">
          <Link to="/librarian/books">
            <Button variant="primary">Manage Books</Button>
          </Link>
          <Link to="/librarian/students">
            <Button variant="secondary">Student Directory</Button>
          </Link>
          <Link to="/librarian/circulation-logs">
            <Button variant="outline">Circulation Logs</Button>
          </Link>
        </div>
      </div>

      {banner && (
        <AlertBanner
          type={banner.type}
          message={banner.message}
          onClose={() => setBanner(null)}
        />
      )}

      {error && <AlertBanner type="error" message={error} onClose={() => setError('')} />}

      {/* 4 Primary Metric Cards */}
      <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-label">Catalog Titles</div>
          <div className="stat-value">{data?.total_titles ?? 0}</div>
          <div className="stat-desc">Distinct catalog titles</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Inventory Copies</div>
          <div className="stat-value">{data?.total_inventory_copies ?? 0}</div>
          <div className="stat-desc">
            {data?.available_copies ?? 0} available • {data?.issued_copies ?? 0} issued
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Active Loans</div>
          <div className="stat-value">{data?.active_loans_count ?? 0}</div>
          <div className="stat-desc">
            {data?.overdue_loans_count > 0 ? (
              <span style={{ fontWeight: 600 }}>{data.overdue_loans_count} overdue</span>
            ) : (
              '0 overdue loans'
            )}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Registered Students</div>
          <div className="stat-value">{data?.registered_students ?? 0}</div>
          <div className="stat-desc">Active library accounts</div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <Card
        title="Recent Circulation Transactions"
        subtitle="Live feed of book loans and returns"
        headerAction={
          <Link to="/librarian/circulation-logs">
            <Button variant="outline" size="sm">
              All Records
            </Button>
          </Link>
        }
      >
        {data?.recent_transactions && data.recent_transactions.length > 0 ? (
          <DataTable columns={columns} data={data.recent_transactions} keyField="id" />
        ) : (
          <EmptyState
            title="No transactions yet"
            description="Circulation transactions will appear here as books are issued."
          />
        )}
      </Card>

      {/* Return Confirmation Modal */}
      {returningTx && (
        <Modal
          isOpen={!!returningTx}
          onClose={() => setReturningTx(null)}
          title="Process Book Return"
          footer={
            <>
              <Button variant="outline" onClick={() => setReturningTx(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                loading={returnLoading}
                onClick={handleConfirmReturn}
              >
                Confirm Return
              </Button>
            </>
          }
        >
          <div className="flex flex-col gap-3">
            <p>
              Confirm return of <strong>{returningTx.book_title}</strong> (Transaction #{returningTx.id})
            </p>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
              <div><strong>Borrower:</strong> {returningTx.student_name} ({returningTx.student_code})</div>
              <div><strong>Issue Date:</strong> {formatDate(returningTx.issue_date)}</div>
              <div><strong>Due Date:</strong> {formatDate(returningTx.due_date)}</div>
            </div>

            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <label className="form-label">Return Notes</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Returned in pristine condition"
                value={returnNotes}
                onChange={(e) => setReturnNotes(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LibrarianDashboard;

