const checkIsSuperAdmin = async (req, res, next) => {
  if (!req.session.admin.isSuper) {
    next(Error('Not super admin'));
  }
  next();
};

module.exports = checkIsSuperAdmin;