const { Router } = require('express');
const AdminController = require('../controllers/adminController');
const checkIsAdmin = require('../middlewares/checkIsAdmin');
const checkIsSuperAdmin = require('../middlewares/checkIsSuperAdmin');
const adminRouter = Router();

adminRouter.get('/all', checkIsAdmin, AdminController.getAllAdmins);

adminRouter
  .route('/')
  .all(checkIsSuperAdmin)
  .post(AdminController.createAdmin)
  .delete(AdminController.deleteAdmin);

module.exports = adminRouter;
