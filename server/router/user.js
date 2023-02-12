const { Router } = require('express');
const UserController = require('../controllers/userController');
const checkIsAdmin = require('../middlewares/checkIsAdmin');

const userRouter = Router();

userRouter.use(checkIsAdmin);

userRouter
  .route('')
  .get(UserController.getUserInfo)
  .delete(UserController.banUser)
  .patch(UserController.updateUserBalance);

userRouter.get('/all', UserController.getAllUsersInfo);

module.exports = userRouter;
