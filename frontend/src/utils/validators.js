/**
 * Email format validation
 */
export function isValidEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Validate password requirements (minimum 8 characters)
 */
export function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 8;
}

/**
 * Validate Student ID format (alphanumeric, at least 3 chars)
 */
export function isValidStudentId(id) {
  if (!id) return false;
  return /^[A-Za-z0-9_-]{3,20}$/.test(id.trim());
}

/**
 * Validate ISBN (non-empty alphanumeric and dashes)
 */
export function isValidISBN(isbn) {
  if (!isbn) return false;
  return /^[0-9\-X]{9,17}$/i.test(isbn.trim());
}

