const { Router } = require('express');
const AuthController = require('../controllers/authController');
const { loginAdmin } = require('../middlewares/auth');

const authRouter = Router();

authRouter.post('/login', loginAdmin, AuthController.login);

module.exports = authRouter;
