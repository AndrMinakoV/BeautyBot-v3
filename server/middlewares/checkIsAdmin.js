const checkIsAdmin = async (req, res, next) => {
  if (!req.session.admin) {
    next(new Error('Not logined'));
  }
  next();
};

module.exports = checkIsAdmin;
