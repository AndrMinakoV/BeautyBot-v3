const AdminService = require("../services/adminService");

const adminService = new AdminService();

const getAllUsersInfo = async (req, res, next) => {
  try {
res.send(await adminService.getAllUsersInfo());
  } catch (e) {
    next(e);
  }
  
};

const getUserInfo = async (req, res, next) => {
  try {
    res.send(await adminService.getInfoAboutUser(req.body.id));
} catch (e) {
  next(e);
}
};

const updateUserBalance = async (req, res, next) => {
  try {
    const { id, amount } = req.body;
    res.send(await adminService.UpdateUserBalance(id, amount));
  } catch (e) {
    next(e);
  }
};

const banUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    await adminService.banUser(id);
    res.end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  updateUserBalance,
  getAllUsersInfo,
  getUserInfo,
  banUser,
};
