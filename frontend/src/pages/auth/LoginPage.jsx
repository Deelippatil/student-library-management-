import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../services/api/authApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import AlertBanner from '../../components/common/AlertBanner';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      if (res.success && res.data) {
        login(res.data.token, res.data.user);
        if (res.data.user.role === 'librarian') {
          navigate('/librarian/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (type) => {
    setError('');
    if (type === 'librarian') {
      setEmail('librarian@library.com');
      setPassword('Librarian@123');
    } else {
      setEmail('student@university.edu');
      setPassword('Student@123');
    }
  };

  return (
    <div className="page-container flex items-center justify-center" style={{ minHeight: '80vh' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--color-black)',
              margin: '0 auto 1rem auto',
              borderRadius: '4px',
            }}
          />
          <h1 style={{ fontSize: '1.6rem' }}>Sign In to SLMS</h1>
          <p className="text-muted" style={{ marginTop: '0.25rem' }}>
            Academic Library Management Portal
          </p>
        </div>

        <Card>
          <AlertBanner type="error" message={error} onClose={() => setError('')} />

          {/* Quick Demo Pre-fills */}
          <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Quick Fill Demo Accounts:
            </span>
            <div className="flex gap-2" style={{ marginTop: '0.5rem' }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickFill('student')}
                style={{ flex: 1, fontSize: '0.75rem' }}
              >
                Demo Student
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickFill('librarian')}
                style={{ flex: 1, fontSize: '0.75rem' }}
              >
                Demo Librarian
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="e.g. student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              Sign In
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <p className="text-muted">
              Don't have a student account?{' '}
              <Link to="/register" style={{ color: 'var(--color-black)', fontWeight: 600, textDecoration: 'underline' }}>
                Register here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;

