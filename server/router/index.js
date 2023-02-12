const { Router } = require('express');
const AdminService = require('../services/adminService');
const adminRouter = require('./admin');
const authRouter = require('./auth');
const userRouter = require('./user');

const router = Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/user', userRouter);


router.use((err, req, res, next) => {
  res.status(500);
  console.error(err);
  res.end(err.message);
});

module.exports = router;
