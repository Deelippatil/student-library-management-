import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Shared Pages
import CatalogSearchPage from '../pages/shared/CatalogSearchPage';
import NotFoundPage from '../pages/shared/NotFoundPage';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import IssuedBooksPage from '../pages/student/IssuedBooksPage';
import HistoryPage from '../pages/student/HistoryPage';

// Librarian Pages
import LibrarianDashboard from '../pages/librarian/LibrarianDashboard';
import ManageBooksPage from '../pages/librarian/ManageBooksPage';
import ManageStudentsPage from '../pages/librarian/ManageStudentsPage';
import CirculationLogsPage from '../pages/librarian/CirculationLogsPage';

export const AppRoutes = () => {
  const { isLibrarian, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '3px solid #000',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
              margin: '0 auto 1rem auto',
            }}
          />
          <p className="text-muted" style={{ fontWeight: 500 }}>
            Initializing Library Workspace...
          </p>
        </div>
      </div>
    );
  }

  const defaultRedirect = isLibrarian ? '/librarian/dashboard' : '/student/dashboard';

  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to={defaultRedirect} replace />} />

      {/* Redirect /login and /register directly into the active dashboard */}
      <Route path="/login" element={<Navigate to={defaultRedirect} replace />} />
      <Route path="/register" element={<Navigate to={defaultRedirect} replace />} />

      {/* Student Protected Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/catalog"
        element={
          <ProtectedRoute requiredRole="student">
            <CatalogSearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/issued-books"
        element={
          <ProtectedRoute requiredRole="student">
            <IssuedBooksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/history"
        element={
          <ProtectedRoute requiredRole="student">
            <HistoryPage />
          </ProtectedRoute>
        }
      />

      {/* Librarian Protected Routes */}
      <Route
        path="/librarian/dashboard"
        element={
          <ProtectedRoute requiredRole="librarian">
            <LibrarianDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/librarian/books"
        element={
          <ProtectedRoute requiredRole="librarian">
            <ManageBooksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/librarian/students"
        element={
          <ProtectedRoute requiredRole="librarian">
            <ManageStudentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/librarian/circulation-logs"
        element={
          <ProtectedRoute requiredRole="librarian">
            <CirculationLogsPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
