const { hash } = require('../helpers/crypto');
const prepareAdminObj = require('../helpers/prepareAdminObj');
const AdminModel = require('../models/admin');

const loginAdmin = async (req, _, next) => {
  try {
    const { login, password } = req.body;
    const findedAdmin = await AdminModel.findOne({ login });
    if (!findedAdmin) return next(new Error('Admin not found'));
    if (!findedAdmin.password === hash(password))
      return next(new Error('Wrong credentials'));
    req.session.admin = prepareAdminObj(findedAdmin);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAdmin,
};
