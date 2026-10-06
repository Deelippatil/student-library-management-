import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authApi from '../../services/api/authApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import AlertBanner from '../../components/common/AlertBanner';
import { isValidEmail, isValidPassword } from '../../utils/validators';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    student_id: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.student_id.trim()) {
      newErrors.student_id = 'Student ID is required (e.g., STU2001).';
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMsg('');

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await authApi.register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        student_id: formData.student_id.trim(),
      });

      if (res.success) {
        setSuccessMsg('Registration successful! Redirecting to sign in...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container flex items-center justify-center" style={{ minHeight: '80vh' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '1.6rem' }}>Create Student Account</h1>
          <p className="text-muted" style={{ marginTop: '0.25rem' }}>
            Register to browse catalog and borrow library books
          </p>
        </div>

        <Card>
          <AlertBanner type="error" message={serverError} onClose={() => setServerError('')} />
          <AlertBanner type="success" message={successMsg} />

          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              name="name"
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <Input
              label="Student ID"
              name="student_id"
              placeholder="e.g. STU1002"
              value={formData.student_id}
              onChange={handleChange}
              error={errors.student_id}
              required
            />

            <Input
              label="University Email"
              name="email"
              type="email"
              placeholder="e.g. alex@university.edu"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              Register Account
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <p className="text-muted">
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--color-black)', fontWeight: 600, textDecoration: 'underline' }}>
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;

