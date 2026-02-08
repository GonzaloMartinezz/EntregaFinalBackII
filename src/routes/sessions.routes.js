const express = require('express');
const router = express.Router();

const SessionsController = require('../controllers/Sessions.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');

router.post('/register', (req, res) => {
  SessionsController.register(req, res);
});

router.post('/login', (req, res) => {
  SessionsController.login(req, res);
});

router.get('/current', verifyJWT, (req, res) => {
  SessionsController.getCurrentUser(req, res);
});

router.post('/logout', verifyJWT, (req, res) => {
  SessionsController.logout(req, res);
});

router.get('/users', verifyJWT, (req, res) => {
  SessionsController.getAllUsers(req, res);
});

module.exports = router;
