import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

export const NotFoundPage = () => {
  const { isAuthenticated, isLibrarian } = useAuth();

  const destination = !isAuthenticated
    ? '/login'
    : isLibrarian
    ? '/librarian/dashboard'
    : '/student/dashboard';

  return (
    <div className="page-container flex flex-col items-center justify-center" style={{ minHeight: '60vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.05em' }}>404</h1>
      <h2 style={{ fontSize: '1.4rem', marginTop: '0.5rem' }}>Page Not Found</h2>
      <p className="text-muted" style={{ maxWidth: '400px', margin: '0.75rem auto 1.5rem auto' }}>
        The page you are looking for does not exist or has been moved to another location.
      </p>
      <Link to={destination}>
        <Button variant="primary">Return to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;

