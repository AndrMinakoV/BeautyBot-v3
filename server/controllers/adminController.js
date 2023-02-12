const AdminService = require('../services/adminService');

const adminService = new AdminService();

const createAdmin = async (req, res, next) => {
  try {
  const {
    body: { login, password },
  } = req;
  await adminService.createAdmin({ login, password });
  res.end();
  } catch (e) {
    next(e);
  }

};

const getAllAdmins = async (req, res, next) => {
  try {
  const admins = await adminService.getAdmins();
  res.send({ data: { admins } });
  } catch (e) {
    next(e);
  }

};

const deleteAdmin = async (req, res, next) => {
  try {
  const {
    body: { login },
  } = req;
  await adminService.deleteAdminByLogin(login);
  res.end();
  } catch (e) {
    next(e);
  }

};

module.exports = {
  createAdmin,
  getAllAdmins,
  deleteAdmin,
};
