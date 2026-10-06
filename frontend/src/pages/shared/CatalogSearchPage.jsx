import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import bookApi from '../../services/api/bookApi';
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

export const CatalogSearchPage = () => {
  const { user, isStudent, isLibrarian } = useAuth();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [banner, setBanner] = useState(null);

  // Modal State
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issueLoading, setIssueLoading] = useState(false);
  const [studentIdForIssue, setStudentIdForIssue] = useState('');

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory) params.category = selectedCategory;

      const res = await bookApi.getAllBooks(params);
      if (res.success) {
        setBooks(res.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to load books from catalog.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await bookApi.getCategories();
      if (res.success && Array.isArray(res.data)) {
        setCategories(res.data);
      }
    } catch {
      // Non-critical if categories fail
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleOpenDetails = (book) => {
    setSelectedBook(book);
    setIsDetailOpen(true);
  };

  const handleOpenIssue = (book) => {
    setSelectedBook(book);
    setStudentIdForIssue(isStudent ? user.id : '');
    setIsIssueModalOpen(true);
  };

  const handleConfirmIssue = async () => {
    if (!selectedBook) return;
    setIssueLoading(true);
    setBanner(null);
    try {
      const payload = {
        book_id: selectedBook.id,
        student_id: isStudent ? user.id : studentIdForIssue,
      };

      const res = await circulationApi.issueBook(payload);
      if (res.success) {
        setBanner({
          type: 'success',
          message: `Success: "${selectedBook.title}" issued! Available stock updated.`,
        });
        setIsIssueModalOpen(false);
        setIsDetailOpen(false);
        fetchBooks(); // Refresh stock
      }
    } catch (err) {
      setBanner({
        type: 'error',
        message: err.message || 'Failed to issue book.',
      });
    } finally {
      setIssueLoading(false);
    }
  };

  const columns = [
    {
      header: 'Title & Author',
      accessor: 'title',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--color-black)' }}>{row.title}</div>
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>by {row.author}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => <span className="text-code">{row.category}</span>,
    },
    {
      header: 'ISBN',
      accessor: 'isbn',
      render: (row) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{row.isbn}</span>,
    },
    {
      header: 'Availability',
      accessor: 'available_copies',
      render: (row) => <StockBadge availableCopies={row.available_copies} totalCopies={row.total_copies} />,
    },
    {
      header: 'Action',
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleOpenDetails(row)}>
            Details
          </Button>
          {isLibrarian && (
            <Button
              variant="secondary"
              size="sm"
              disabled={row.available_copies <= 0}
              onClick={() => handleOpenIssue(row)}
            >
              Issue
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Library Catalog</h1>
          <p className="text-muted">Browse and search university collection</p>
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

      {/* Filter and Search Bar */}
      <Card style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <SearchBar
              value={searchQuery}
              onSearch={(val) => setSearchQuery(val)}
              placeholder="Search by title, author, category, or ISBN..."
            />
          </div>
          <div style={{ minWidth: '180px' }}>
            <select
              className="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Catalog Table */}
      {loading ? (
        <Card>
          <LoadingSkeleton rows={5} height="48px" />
        </Card>
      ) : books.length === 0 ? (
        <EmptyState
          title="No books found"
          description={
            searchQuery || selectedCategory
              ? "No titles matched your search filters. Try clearing your search."
              : "There are currently no books registered in the catalog."
          }
          actionLabel={searchQuery || selectedCategory ? "Clear Filters" : undefined}
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('');
          }}
        />
      ) : (
        <DataTable columns={columns} data={books} keyField="id" />
      )}

      {/* Book Details Modal */}
      {selectedBook && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title="Bibliographic Details"
          footer={
            <div className="flex justify-between" style={{ width: '100%' }}>
              <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                Close
              </Button>
              {isLibrarian && (
                <Button
                  variant="primary"
                  disabled={selectedBook.available_copies <= 0}
                  onClick={() => {
                    setIsDetailOpen(false);
                    handleOpenIssue(selectedBook);
                  }}
                >
                  Issue Book to Student
                </Button>
              )}
            </div>
          }
        >
          <div className="flex flex-col gap-3">
            <div>
              <h2 style={{ fontSize: '1.3rem' }}>{selectedBook.title}</h2>
              <p style={{ fontWeight: 500, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                Author: {selectedBook.author}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
              <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                <span className="text-muted">Category:</span>
                <span className="font-semibold">{selectedBook.category}</span>
              </div>
              <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                <span className="text-muted">ISBN:</span>
                <span className="text-code">{selectedBook.isbn}</span>
              </div>
              {selectedBook.publisher && (
                <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                  <span className="text-muted">Publisher:</span>
                  <span>{selectedBook.publisher}</span>
                </div>
              )}
              <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                <span className="text-muted">Total Copies:</span>
                <span className="font-semibold">{selectedBook.total_copies}</span>
              </div>
              <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                <span className="text-muted">Available Copies:</span>
                <span className="font-semibold">{selectedBook.available_copies}</span>
              </div>
              <div className="flex justify-between items-center" style={{ marginTop: '0.75rem' }}>
                <span className="text-muted">Status:</span>
                <StockBadge
                  availableCopies={selectedBook.available_copies}
                  totalCopies={selectedBook.total_copies}
                />
              </div>
            </div>

            {isStudent && (
              <div
                style={{
                  marginTop: '0.5rem',
                  padding: '0.85rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                }}
              >
                <strong>Borrowing Notice:</strong> Books can be issued directly at the library circulation desk by the librarian. Please present your Student ID (<strong>{user?.student_id || 'STU'}</strong>) at the desk.
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Librarian Issue Book Modal */}
      {isLibrarian && selectedBook && (
        <Modal
          isOpen={isIssueModalOpen}
          onClose={() => setIsIssueModalOpen(false)}
          title={`Issue "${selectedBook.title}"`}
          footer={
            <>
              <Button variant="outline" onClick={() => setIsIssueModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                loading={issueLoading}
                disabled={!studentIdForIssue}
                onClick={handleConfirmIssue}
              >
                Confirm Issue
              </Button>
            </>
          }
        >
          <div className="flex flex-col gap-3">
            <p className="text-muted">
              Confirm loan of <strong>{selectedBook.title}</strong> (ISBN: {selectedBook.isbn}).
            </p>

            <div className="form-group">
              <label className="form-label">Student ID (Database User ID)</label>
              <input
                type="number"
                placeholder="Enter Student User ID (e.g., 2)"
                value={studentIdForIssue}
                onChange={(e) => setStudentIdForIssue(e.target.value)}
                className="input"
                required
              />
              <span className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
                Enter the student's internal system ID or select from the Students directory.
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CatalogSearchPage;

