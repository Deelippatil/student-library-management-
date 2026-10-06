import React, { useState, useEffect, useCallback } from 'react';
import circulationApi from '../../services/api/circulationApi';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import DataTable from '../../components/common/DataTable';
import StockBadge from '../../components/common/StockBadge';
import Modal from '../../components/common/Modal';
import AlertBanner from '../../components/common/AlertBanner';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { formatDate } from '../../utils/formatters';

export const CirculationLogsPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [banner, setBanner] = useState(null);

  // Return Book modal
  const [returningTx, setReturningTx] = useState(null);
  const [returnNotes, setReturnNotes] = useState('');
  const [returnLoading, setReturnLoading] = useState(false);

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (statusFilter) params.status = statusFilter;

      const res = await circulationApi.getAllRecords(params);
      if (res.success) {
        setRecords(res.data || []);
      }
    } catch (err) {
      setBanner({ type: 'error', message: err.message || 'Failed to load circulation records.' });
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleOpenReturn = (tx) => {
    setReturningTx(tx);
    setReturnNotes('Returned at counter');
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
          message: `Book "${returningTx.book_title}" returned successfully!`,
        });
        setReturningTx(null);
        fetchRecords();
      }
    } catch (err) {
      setBanner({ type: 'error', message: err.message || 'Failed to process return.' });
    } finally {
      setReturnLoading(false);
    }
  };

  const columns = [
    {
      header: 'Tx ID',
      accessor: 'id',
      render: (row) => <span className="text-code">#{row.id}</span>,
      width: '70px',
    },
    {
      header: 'Book Title',
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
          {row.is_overdue && (
            <span className="badge badge-overdue" style={{ fontSize: '0.65rem' }}>
              Overdue
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Return Date',
      accessor: 'return_date',
      render: (row) => formatDate(row.return_date),
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
            Return
          </Button>
        ) : (
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>Closed</span>
        )
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Master Circulation Logs</h1>
          <p className="text-muted">Institutional borrowing and return audit trail</p>
        </div>
      </div>

      {banner && (
        <AlertBanner
          type={banner.type}
          message={banner.message}
          onClose={() => setBanner(null)}
        />
      )}

      {/* Filters */}
      <Card style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <SearchBar
              value={searchQuery}
              onSearch={(val) => setSearchQuery(val)}
              placeholder="Search by student name, book title, or ISBN..."
            />
          </div>
          <div style={{ minWidth: '160px' }}>
            <select
              className="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by circulation status"
            >
              <option value="">All Statuses</option>
              <option value="issued">Currently Issued</option>
              <option value="returned">Returned</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Table */}
      {loading ? (
        <Card>
          <LoadingSkeleton rows={6} height="50px" />
        </Card>
      ) : records.length === 0 ? (
        <EmptyState
          title="No records found"
          description="No circulation transactions match the selected filters."
          actionLabel="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setStatusFilter('');
          }}
        />
      ) : (
        <DataTable columns={columns} data={records} keyField="id" />
      )}

      {/* Return Modal */}
      {returningTx && (
        <Modal
          isOpen={!!returningTx}
          onClose={() => setReturningTx(null)}
          title={`Process Return for #${returningTx.id}`}
          footer={
            <>
              <Button variant="outline" onClick={() => setReturningTx(null)}>
                Cancel
              </Button>
              <Button variant="primary" loading={returnLoading} onClick={handleConfirmReturn}>
                Confirm Return
              </Button>
            </>
          }
        >
          <div className="flex flex-col gap-3">
            <p>
              Confirm return of <strong>{returningTx.book_title}</strong> borrowed by{' '}
              <strong>{returningTx.student_name}</strong>.
            </p>
            <div className="form-group">
              <label className="form-label">Return Notes</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Returned on time"
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

export default CirculationLogsPage;

