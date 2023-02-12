const { Router } = require('express');
const AdminController = require('../controllers/adminController');
const SendController = require('../controllers/sendController');
const checkIsAdmin = require('../middlewares/checkIsAdmin');
const checkIsSuperAdmin = require('../middlewares/checkIsSuperAdmin');
const adminRouter = Router();

adminRouter
  .route('/')
  .all(checkIsSuperAdmin)
  .post(AdminController.createAdmin)
  .delete(AdminController.deleteAdmin);

adminRouter.use(checkIsAdmin);

adminRouter.get('/all', AdminController.getAllAdmins);

adminRouter.post('/send', SendController.send);

adminRouter.post('/massSend', SendController.massSend);

module.exports = adminRouter;
