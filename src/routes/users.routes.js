const express = require('express');
const router = express.Router();

const SessionsController = require('../controllers/Sessions.controller');
const { verifyJWT, verifyAdmin } = require('../middlewares/auth.middleware');

router.get('/', verifyJWT, verifyAdmin, (req, res) => {
  SessionsController.getAllUsers(req, res);
});

module.exports = router;
