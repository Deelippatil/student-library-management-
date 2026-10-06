import React, { useState, useEffect, useCallback } from 'react';
import librarianApi from '../../services/api/librarianApi';
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

export const ManageStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [banner, setBanner] = useState(null);

  // Inspection Modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Return Book State inside inspection modal
  const [returningTx, setReturningTx] = useState(null);
  const [returnNotes, setReturnNotes] = useState('');
  const [returnLoading, setReturnLoading] = useState(false);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;

      const res = await librarianApi.getAllStudents(params);
      if (res.success) {
        setStudents(res.data || []);
      }
    } catch (err) {
      setBanner({ type: 'error', message: err.message || 'Failed to load students.' });
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleInspect = async (student) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
    setDetailLoading(true);
    try {
      const res = await librarianApi.getStudentById(student.id);
      if (res.success) {
        setStudentDetails(res.data);
      }
    } catch (err) {
      setBanner({ type: 'error', message: err.message || 'Failed to inspect student profile.' });
    } finally {
      setDetailLoading(false);
    }
  };

  const handleConfirmReturn = async () => {
    if (!returningTx) return;
    setReturnLoading(true);
    try {
      const res = await circulationApi.returnBook({
        transaction_id: returningTx.id,
        return_notes: returnNotes || 'Returned via student profile inspection',
      });

      if (res.success) {
        setBanner({
          type: 'success',
          message: `Book "${returningTx.book_title}" returned successfully!`,
        });
        setReturningTx(null);
        // Refresh student details & list
        if (selectedStudent) {
          const detailRes = await librarianApi.getStudentById(selectedStudent.id);
          if (detailRes.success) setStudentDetails(detailRes.data);
        }
        fetchStudents();
      }
    } catch (err) {
      setBanner({ type: 'error', message: err.message || 'Failed to return book.' });
    } finally {
      setReturnLoading(false);
    }
  };

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      render: (row) => <span className="text-code">#{row.id}</span>,
      width: '60px',
    },
    {
      header: 'Student Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.name}</div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>{row.email}</div>
        </div>
      ),
    },
    {
      header: 'Student Code',
      accessor: 'student_id',
      render: (row) => <span className="font-semibold">{row.student_id}</span>,
    },
    {
      header: 'Active Loans',
      accessor: 'active_loans_count',
      render: (row) => (
        <span>
          {row.active_loans_count} active
          {row.overdue_loans_count > 0 && (
            <span className="badge badge-overdue" style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>
              {row.overdue_loans_count} overdue
            </span>
          )}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`badge ${row.status === 'active' ? 'badge-available' : 'badge-out-of-stock'}`}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Action',
      render: (row) => (
        <Button variant="outline" size="sm" onClick={() => handleInspect(row)}>
          Inspect Profile
        </Button>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Student Directory</h1>
          <p className="text-muted">Registered library members, active borrowings, and borrowing history</p>
        </div>
      </div>

      {banner && (
        <AlertBanner
          type={banner.type}
          message={banner.message}
          onClose={() => setBanner(null)}
        />
      )}

      {/* Search */}
      <Card style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <SearchBar
          value={searchQuery}
          onSearch={(val) => setSearchQuery(val)}
          placeholder="Search students by name, email, or Student ID..."
        />
      </Card>

      {/* Directory Table */}
      {loading ? (
        <Card>
          <LoadingSkeleton rows={5} height="50px" />
        </Card>
      ) : students.length === 0 ? (
        <EmptyState
          title="No students found"
          description="No student records match the search query."
          actionLabel="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <DataTable columns={columns} data={students} keyField="id" />
      )}

      {/* Student Profile Inspection Modal */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={selectedStudent ? `Student Profile: ${selectedStudent.name}` : 'Student Profile'}
        maxWidth="720px"
        footer={
          <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
            Close
          </Button>
        }
      >
        {detailLoading ? (
          <LoadingSkeleton rows={4} height="50px" />
        ) : studentDetails ? (
          <div className="flex flex-col gap-4">
            {/* Summary Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>User ID</span>
                <div style={{ fontWeight: 700 }}>#{studentDetails.student.id}</div>
              </div>
              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Student ID</span>
                <div style={{ fontWeight: 700 }}>{studentDetails.student.student_id}</div>
              </div>
              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Active Loans</span>
                <div style={{ fontWeight: 700 }}>{studentDetails.summary.active_loans_count}</div>
              </div>
              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Returned</span>
                <div style={{ fontWeight: 700 }}>{studentDetails.summary.returned_count}</div>
              </div>
            </div>

            {/* Currently Active Loans Section */}
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Currently Active Loans ({studentDetails.active_loans.length})</h4>
              {studentDetails.active_loans.length === 0 ? (
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>No active loans for this student.</p>
              ) : (
                <div className="table-wrapper">
                  <table className="table" style={{ fontSize: '0.85rem' }}>
                    <thead>
                      <tr>
                        <th>Book Title</th>
                        <th>ISBN</th>
                        <th>Due Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentDetails.active_loans.map((tx) => (
                        <tr key={tx.id}>
                          <td><strong>{tx.book_title}</strong></td>
                          <td><span className="text-code">{tx.book_isbn}</span></td>
                          <td>
                            {formatDate(tx.due_date)}
                            {tx.is_overdue && (
                              <span className="badge badge-overdue" style={{ marginLeft: '0.35rem', fontSize: '0.65rem' }}>
                                Overdue
                              </span>
                            )}
                          </td>
                          <td>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setReturningTx(tx);
                                setReturnNotes('Returned at counter');
                              }}
                            >
                              Return Book
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Completed Reading History */}
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Borrowing History ({studentDetails.history_loans.length})</h4>
              {studentDetails.history_loans.length === 0 ? (
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>No previous borrowing history.</p>
              ) : (
                <div className="table-wrapper">
                  <table className="table" style={{ fontSize: '0.85rem' }}>
                    <thead>
                      <tr>
                        <th>Book Title</th>
                        <th>Issue Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentDetails.history_loans.slice(0, 5).map((tx) => (
                        <tr key={tx.id}>
                          <td>{tx.book_title}</td>
                          <td>{formatDate(tx.issue_date)}</td>
                          <td>{formatDate(tx.return_date)}</td>
                          <td><StockBadge status={tx.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </Modal>

      {/* Return confirmation modal */}
      {returningTx && (
        <Modal
          isOpen={!!returningTx}
          onClose={() => setReturningTx(null)}
          title="Process Return"
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
              Confirm return of <strong>{returningTx.book_title}</strong> for student{' '}
              <strong>{selectedStudent?.name}</strong>.
            </p>
            <div className="form-group">
              <label className="form-label">Return Notes</label>
              <input
                type="text"
                className="input"
                value={returnNotes}
                onChange={(e) => setReturnNotes(e.target.value)}
                placeholder="Condition notes (optional)"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManageStudentsPage;

