import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

export const Navbar = () => {
  const { user, isAuthenticated, isStudent, isLibrarian, switchRole, logout } = useAuth();
  const [switching, setSwitching] = useState(false);
  const navigate = useNavigate();

  const handleRoleToggle = async () => {
    setSwitching(true);
    const nextRole = isLibrarian ? 'student' : 'librarian';
    await switchRole(nextRole);
    setSwitching(false);
    navigate(nextRole === 'librarian' ? '/librarian/dashboard' : '/student/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-white)',
        borderBottom: '1px solid var(--color-gray-800)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: 'var(--navbar-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            to={isStudent ? '/student/dashboard' : '/librarian/dashboard'}
            style={{
              color: 'var(--color-white)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.15rem',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '18px',
                height: '18px',
                backgroundColor: 'var(--color-white)',
                borderRadius: '2px',
              }}
            ></span>
            SLMS
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1" style={{ fontSize: '0.9rem' }}>
          {isStudent && (
            <>
              <NavLink
                to="/student/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-white)' : 'var(--color-gray-400)',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--color-gray-800)' : 'transparent',
                })}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/student/catalog"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-white)' : 'var(--color-gray-400)',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--color-gray-800)' : 'transparent',
                })}
              >
                Catalog
              </NavLink>
              <NavLink
                to="/student/issued-books"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-white)' : 'var(--color-gray-400)',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--color-gray-800)' : 'transparent',
                })}
              >
                Issued Books
              </NavLink>
              <NavLink
                to="/student/history"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-white)' : 'var(--color-gray-400)',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--color-gray-800)' : 'transparent',
                })}
              >
                History
              </NavLink>
            </>
          )}

          {isLibrarian && (
            <>
              <NavLink
                to="/librarian/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-white)' : 'var(--color-gray-400)',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--color-gray-800)' : 'transparent',
                })}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/librarian/books"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-white)' : 'var(--color-gray-400)',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--color-gray-800)' : 'transparent',
                })}
              >
                Manage Books
              </NavLink>
              <NavLink
                to="/librarian/students"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-white)' : 'var(--color-gray-400)',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--color-gray-800)' : 'transparent',
                })}
              >
                Students
              </NavLink>
              <NavLink
                to="/librarian/circulation-logs"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-white)' : 'var(--color-gray-400)',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--color-gray-800)' : 'transparent',
                })}
              >
                Circulation Logs
              </NavLink>
            </>
          )}
        </nav>

        {/* 1-Click Role Switcher & User Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Role Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRoleToggle}
            loading={switching}
            style={{
              backgroundColor: 'var(--color-white)',
              color: 'var(--color-black)',
              borderColor: 'var(--color-white)',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            {isLibrarian ? '⇄ Switch to Student View' : '⇄ Switch to Librarian View'}
          </Button>

          {user && (
            <div className="flex flex-col items-end" style={{ lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name}</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--color-gray-400)',
                }}
              >
                {user.role} {user.student_id ? `• ${user.student_id}` : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
