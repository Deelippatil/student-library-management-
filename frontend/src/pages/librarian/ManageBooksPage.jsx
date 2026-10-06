import React, { useState, useEffect, useCallback } from 'react';
import bookApi from '../../services/api/bookApi';
import circulationApi from '../../services/api/circulationApi';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import SearchBar from '../../components/common/SearchBar';
import DataTable from '../../components/common/DataTable';
import StockBadge from '../../components/common/StockBadge';
import Modal from '../../components/common/Modal';
import AlertBanner from '../../components/common/AlertBanner';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';

export const ManageBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [banner, setBanner] = useState(null);

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isIssueOpen, setIsIssueOpen] = useState(false);

  const [activeBook, setActiveBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    total_copies: 1,
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [studentIdForIssue, setStudentIdForIssue] = useState('');

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory) params.category = selectedCategory;

      const res = await bookApi.getAllBooks(params);
      if (res.success) {
        setBooks(res.data || []);
      }
    } catch (err) {
      setBanner({ type: 'error', message: err.message || 'Failed to load books.' });
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
      // Ignore
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      author: '',
      isbn: '',
      category: '',
      publisher: '',
      total_copies: 1,
    });
    setFormErrors({});
    setIsAddOpen(true);
  };

  const handleOpenEdit = (book) => {
    setActiveBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      publisher: book.publisher || '',
      total_copies: book.total_copies,
    });
    setFormErrors({});
    setIsEditOpen(true);
  };

  const handleOpenDelete = (book) => {
    setActiveBook(book);
    setIsDeleteOpen(true);
  };

  const handleOpenIssue = (book) => {
    setActiveBook(book);
    setStudentIdForIssue('');
    setIsIssueOpen(true);
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required.';
    if (!formData.author.trim()) errs.author = 'Author is required.';
    if (!formData.isbn.trim()) errs.isbn = 'ISBN is required.';
    if (!formData.category.trim()) errs.category = 'Category is required.';
    if (!formData.total_copies || Number(formData.total_copies) < 1) {
      errs.total_copies = 'Total copies must be at least 1.';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitLoading(true);
    setBanner(null);
    try {
      const res = await bookApi.addBook({
        ...formData,
        total_copies: Number(formData.total_copies),
      });

      if (res.success) {
        setBanner({ type: 'success', message: `Title "${formData.title}" added to catalog!` });
        setIsAddOpen(false);
        fetchBooks();
        fetchCategories();
      }
    } catch (err) {
      setBanner({ type: 'error', message: err.message || 'Failed to add book.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check copies constraint: total cannot be less than currently circulating
    const circulating = activeBook.total_copies - activeBook.available_copies;
    if (Number(formData.total_copies) < circulating) {
      setFormErrors({
        total_copies: `Total copies cannot be lower than ${circulating} (currently issued copies).`,
      });
      return;
    }

    setSubmitLoading(true);
    setBanner(null);
    try {
      const res = await bookApi.updateBook(activeBook.id, {
        ...formData,
        total_copies: Number(formData.total_copies),
      });

      if (res.success) {
        setBanner({ type: 'success', message: `Book "${formData.title}" updated successfully.` });
        setIsEditOpen(false);
        fetchBooks();
      }
    } catch (err) {
      setBanner({ type: 'error', message: err.message || 'Failed to update book.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!activeBook) return;
    setSubmitLoading(true);
    setBanner(null);
    try {
      const res = await bookApi.deleteBook(activeBook.id);
      if (res.success) {
        setBanner({ type: 'success', message: `Book "${activeBook.title}" removed from catalog.` });
        setIsDeleteOpen(false);
        fetchBooks();
      }
    } catch (err) {
      setBanner({ type: 'error', message: err.message || 'Failed to delete book.' });
      setIsDeleteOpen(false);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleIssueSubmit = async () => {
    if (!activeBook || !studentIdForIssue) return;
    setSubmitLoading(true);
    setBanner(null);
    try {
      const res = await circulationApi.issueBook({
        book_id: activeBook.id,
        student_id: Number(studentIdForIssue),
      });

      if (res.success) {
        setBanner({ type: 'success', message: `Book issued successfully to student #${studentIdForIssue}.` });
        setIsIssueOpen(false);
        fetchBooks();
      }
    } catch (err) {
      setBanner({ type: 'error', message: err.message || 'Failed to issue book.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const columns = [
    {
      header: 'Title & Author',
      accessor: 'title',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.title}</div>
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
      header: 'Stock Status',
      accessor: 'available_copies',
      render: (row) => <StockBadge availableCopies={row.available_copies} totalCopies={row.total_copies} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={row.available_copies <= 0}
            onClick={() => handleOpenIssue(row)}
            title={row.available_copies <= 0 ? 'No copies available to issue' : 'Issue to student'}
          >
            Issue
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleOpenEdit(row)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleOpenDelete(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Book Inventory Management</h1>
          <p className="text-muted">Register, edit, delete, and inspect library catalog holdings</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd}>
          + Add New Book
        </Button>
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

      {/* Table */}
      {loading ? (
        <Card>
          <LoadingSkeleton rows={5} height="50px" />
        </Card>
      ) : books.length === 0 ? (
        <EmptyState
          title="No books in catalog"
          description="Click '+ Add New Book' above to register the first book title."
          actionLabel="+ Add New Book"
          onAction={handleOpenAdd}
        />
      ) : (
        <DataTable columns={columns} data={books} keyField="id" />
      )}

      {/* Add Book Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Book to Catalog"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" loading={submitLoading} onClick={handleAddSubmit}>
              Save Book
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddSubmit}>
          <Input
            label="Book Title"
            name="title"
            placeholder="e.g. Designing Data-Intensive Applications"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={formErrors.title}
            required
          />
          <Input
            label="Author"
            name="author"
            placeholder="e.g. Martin Kleppmann"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            error={formErrors.author}
            required
          />
          <Input
            label="ISBN"
            name="isbn"
            placeholder="e.g. 978-1449373320"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            error={formErrors.isbn}
            required
          />
          <Input
            label="Category"
            name="category"
            placeholder="e.g. Computer Science / Databases"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            error={formErrors.category}
            required
          />
          <Input
            label="Publisher"
            name="publisher"
            placeholder="e.g. O'Reilly Media (optional)"
            value={formData.publisher}
            onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
          />
          <Input
            label="Total Copies"
            name="total_copies"
            type="number"
            min="1"
            value={formData.total_copies}
            onChange={(e) => setFormData({ ...formData, total_copies: e.target.value })}
            error={formErrors.total_copies}
            required
          />
        </form>
      </Modal>

      {/* Edit Book Modal */}
      {activeBook && (
        <Modal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title={`Edit "${activeBook.title}"`}
          footer={
            <>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" loading={submitLoading} onClick={handleEditSubmit}>
                Update Book
              </Button>
            </>
          }
        >
          <form onSubmit={handleEditSubmit}>
            <Input
              label="Book Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={formErrors.title}
              required
            />
            <Input
              label="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              error={formErrors.author}
              required
            />
            <Input
              label="ISBN"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              error={formErrors.isbn}
              required
            />
            <Input
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              error={formErrors.category}
              required
            />
            <Input
              label="Publisher"
              value={formData.publisher}
              onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
            />
            <Input
              label="Total Copies"
              type="number"
              min="1"
              value={formData.total_copies}
              onChange={(e) => setFormData({ ...formData, total_copies: e.target.value })}
              error={formErrors.total_copies}
              required
            />
            <p className="text-muted" style={{ fontSize: '0.8rem' }}>
              Currently Issued Copies: {activeBook.total_copies - activeBook.available_copies}
            </p>
          </form>
        </Modal>
      )}

      {/* Safe Delete Modal */}
      {activeBook && (
        <Modal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title={`Delete "${activeBook.title}"`}
          footer={
            <>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                disabled={activeBook.available_copies < activeBook.total_copies}
                loading={submitLoading}
                onClick={handleDeleteSubmit}
              >
                Delete Title
              </Button>
            </>
          }
        >
          <div>
            <p style={{ marginBottom: '1rem' }}>
              Are you sure you want to delete <strong>{activeBook.title}</strong> (ISBN: {activeBook.isbn})?
            </p>

            {/* Safe Deletion Invariant Guard */}
            {activeBook.available_copies < activeBook.total_copies ? (
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-black)',
                  color: 'var(--color-white)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                }}
              >
                <strong>CANNOT DELETE:</strong> There are currently{' '}
                <strong>{activeBook.total_copies - activeBook.available_copies} active copy(ies)</strong> on
                loan to students. All copies must be returned before this title can be safely removed.
              </div>
            ) : (
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                All {activeBook.total_copies} copies are currently in the library inventory. This action will permanently remove the record from the catalog.
              </p>
            )}
          </div>
        </Modal>
      )}

      {/* Issue Modal */}
      {activeBook && (
        <Modal
          isOpen={isIssueOpen}
          onClose={() => setIsIssueOpen(false)}
          title={`Issue "${activeBook.title}"`}
          footer={
            <>
              <Button variant="outline" onClick={() => setIsIssueOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                disabled={!studentIdForIssue}
                loading={submitLoading}
                onClick={handleIssueSubmit}
              >
                Issue Copy
              </Button>
            </>
          }
        >
          <div>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>
              Available copies: <strong>{activeBook.available_copies}</strong> of {activeBook.total_copies}
            </p>
            <div className="form-group">
              <label className="form-label">Student ID (User ID)</label>
              <input
                type="number"
                placeholder="Enter student user ID (e.g. 2)"
                value={studentIdForIssue}
                onChange={(e) => setStudentIdForIssue(e.target.value)}
                className="input"
                required
              />
              <span className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
                Look up student ID numbers in the <em>Manage Students</em> directory tab.
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManageBooksPage;

