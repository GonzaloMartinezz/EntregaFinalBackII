const express = require('express');
const router = express.Router();

const SessionsController = require('../controllers/Sessions.controller');
const { verifyJWT, authorization } = require('../middlewares/auth.middleware');

// Registro y Login (Públicos)
router.post('/register', (req, res) => SessionsController.register(req, res));
router.post('/login', (req, res) => SessionsController.login(req, res));

// --- CONSIGNHA: Recuperación de contraseña (Mailing) ---
router.post('/password-reset-request', (req, res) => SessionsController.requestPasswordReset(req, res));
router.post('/password-reset', (req, res) => SessionsController.resetPassword(req, res));

// --- CONSIGNHA: /current (Usa DTO internamente en el controller) ---
router.get('/current', verifyJWT, (req, res) => SessionsController.getCurrentUser(req, res));

// Logout
router.post('/logout', verifyJWT, (req, res) => SessionsController.logout(req, res));

// Ejemplo de uso de roles (Punto 3 de la consigna)
router.get('/users', verifyJWT, authorization(['admin']), (req, res) => {
    SessionsController.getAllUsers(req, res);
});

module.exports = router;