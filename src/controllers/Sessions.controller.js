const UserService = require('../services/User.service');

class SessionsController {
  async getCurrentUser(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'No autorizado',
        });
      }

      const result = await UserService.getCurrentUser(req.user._id);

      if (result.success) {
        return res.status(200).json({
          success: true,
          payload: result.data,
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async register(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;

      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Faltan campos requeridos',
        });
      }

      const result = await UserService.registerUser({
        first_name,
        last_name,
        email,
        password,
      });

      if (result.success) {
        return res.status(201).json({
          success: true,
          payload: result.data,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email y contraseña requeridos',
        });
      }

      const result = await UserService.loginUser(email, password);

      if (result.success) {
        return res.status(200).json({
          success: true,
          payload: result.data,
        });
      } else {
        return res.status(401).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie('jwtToken');
      return res.status(200).json({
        success: true,
        message: 'Sesión cerrada',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAllUsers(req, res) {
    try {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Solo administradores pueden ver todos los usuarios',
        });
      }

      const result = await UserService.getAllUsers();

      if (result.success) {
        return res.status(200).json({
          success: true,
          payload: result.data,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new SessionsController();
