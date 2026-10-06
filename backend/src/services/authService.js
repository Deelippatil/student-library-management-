const db = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');
const { validateEmail } = require('../middleware/validation');

class AuthService {
  async registerStudent({ name, email, password, student_id }) {
    // 1. Validate inputs
    if (!name || !email || !password || !student_id) {
      const err = new Error('All fields are required: name, email, password, student_id');
      err.statusCode = 400;
      throw err;
    }

    if (!validateEmail(email)) {
      const err = new Error('Invalid email address format.');
      err.statusCode = 400;
      throw err;
    }

    if (password.length < 6) {
      const err = new Error('Password must be at least 6 characters long.');
      err.statusCode = 400;
      throw err;
    }

    // 2. Check duplicate email
    const existingEmail = await db.query('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existingEmail.length > 0) {
      const err = new Error('An account with this email address already exists.');
      err.statusCode = 409;
      throw err;
    }

    // 3. Check duplicate student ID
    const existingId = await db.query('SELECT id FROM users WHERE student_id = ?', [student_id.trim()]);
    if (existingId.length > 0) {
      const err = new Error('A student with this Student ID is already registered.');
      err.statusCode = 409;
      throw err;
    }

    // 4. Hash password and insert
    const hashedPassword = await hashPassword(password);
    const result = await db.execute(
      `INSERT INTO users (name, email, password, role, student_id, status)
       VALUES (?, ?, ?, 'student', ?, 'active')`,
      [name.trim(), email.toLowerCase().trim(), hashedPassword, student_id.trim()]
    );

    const newUserId = result.insertId;
    const token = generateToken({
      id: newUserId,
      email: email.toLowerCase().trim(),
      role: 'student',
      name: name.trim(),
      student_id: student_id.trim()
    });

    return {
      token,
      user: {
        id: newUserId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role: 'student',
        student_id: student_id.trim(),
        status: 'active'
      }
    };
  }

  async login({ email, password }) {
    if (!email || !password) {
      const err = new Error('Email and password are required.');
      err.statusCode = 400;
      throw err;
    }

    const rows = await db.query(
      'SELECT id, name, email, password, role, student_id, status FROM users WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    if (rows.length === 0) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const user = rows[0];

    if (user.status !== 'active') {
      const err = new Error('Your account is currently inactive. Please contact the librarian.');
      err.statusCode = 403;
      throw err;
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      student_id: user.student_id
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        student_id: user.student_id,
        status: user.status
      }
    };
  }

  async getProfile(userId) {
    const rows = await db.query(
      'SELECT id, name, email, role, student_id, status, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      const err = new Error('User not found.');
      err.statusCode = 404;
      throw err;
    }

    return rows[0];
  }
}

module.exports = new AuthService();
