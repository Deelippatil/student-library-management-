const authService = require('../services/authService');

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password, student_id } = req.body;
      const data = await authService.registerStudent({ name, email, password, student_id });
      return res.status(201).json({
        success: true,
        message: 'Student registered successfully.',
        data
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login({ email, password });
      return res.status(200).json({
        success: true,
        message: 'Login successful.',
        data
      });
    } catch (err) {
      next(err);
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);
      return res.status(200).json({
        success: true,
        data: user
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
