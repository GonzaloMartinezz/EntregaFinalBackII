const UserService = require('../services/User.service');
const UserDTO = require('../dto/User.dto');
const transport = require('../config/mail.config');
const jwt = require('jsonwebtoken');

class SessionsController {
  
  async getCurrentUser(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, error: 'No autorizado' });
      }

      // 1. Buscamos al usuario (puedes usar el Service o el req.user directamente)
      const result = await UserService.getCurrentUser(req.user._id);

      if (result.success) {
        const userClean = new UserDTO(result.data);

        return res.status(200).json({
          success: true,
          payload: userClean, 
        });
      }
      // ... manejo de errores
    } catch (error) {
       res.status(500).json({ success: false, error: error.message });
    }
  }

  // --- NUEVOS MÉTODOS PARA MAILING (Consigna: Recuperación de contraseña) ---

  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;
      const result = await UserService.getUserByEmail(email);

      if (!result.success) return res.status(404).json({ success: false, error: "Usuario no existe" });

      // Generar token de 1 hora
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const resetLink = `http://localhost:8080/reset-password/${token}`;

      await transport.sendMail({
        from: 'Backend Ecommerce <noreply@test.com>',
        to: email,
        subject: 'Recuperación de Contraseña',
        html: `<h1>Reset Password</h1><p>Haz click abajo:</p><a href="${resetLink}">Restablecer</a>`
      });

      res.status(200).json({ success: true, message: "Email enviado" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // La lógica de "no misma contraseña" debe estar en el Service
      const result = await UserService.updatePassword(decoded.email, newPassword);

      if (result.success) {
        res.status(200).json({ success: true, message: "Contraseña actualizada" });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(400).json({ success: false, error: "Token inválido o expirado" });
    }
  }

}

module.exports = new SessionsController();