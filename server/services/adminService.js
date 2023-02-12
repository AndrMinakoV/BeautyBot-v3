/*
1. Управление пользователями: выдать баланс, забрать баланс, 
????забанить
2. Баланс = гроші, через liqpay api\\monobank api
3. Просмотр логов - вывод логов на сайт с обновлением в реальном времени (через websoket)
4. Управление админами - назначить\снять
5. Управление рассылкой - создание поста, сохранение поста в список, таймер, сохранение поста в список с таймером

*/

const i18n = require('../bot/locales/localization');
const { hash } = require('../helpers/crypto');
const AdminModel = require('../models/admin');
const CategoryService = require('./categoryService');
const ItemService = require('./itemService');
const LocalizationService = require('./localizationService');
const Userservice = require('./userService');

class AdminService {
  constructor() {
    const localizationService = new LocalizationService(i18n);
    this.itemService = new ItemService(localizationService);
    this.categoryService = new CategoryService(localizationService);
    this.userService = new Userservice();
    this.model = AdminModel;
  }

  async getInfoAboutUser(userId) {
    return await this.userService.findUserById(userId);
  }

  async getAllUsersInfo() {
    return await this.userService.findAll();
  }

  async banUser(userId) {
    const user = await this.userService.findUserById(userId);
    if (!user) throw new Error("User not found")
    if (user.isBanned === true) throw new Error("User already banned!")
    user.isBanned = true
    await user.save();
    return true;
  }

  async UpdateUserBalance(userId, amount) {
    const user = await this.userService.findUserById(userId);
    user.balance = amount;
    await user.save();
  }

  async createAdmin({ login, password }) {
    const admin = new this.model({ login, password: hash(password) });
    await admin.save();
    return admin;
  }

  async getAdmins() {
    const admins = await this.model.find({});
    return admins;
  }

  async deleteAdminByLogin(login) {
    const admin = await this.model.findOne({ $where: { login } });
    if (admin.isSuper) {
      throw new Error("Can't delete super admin");
    }
    await admin.remove();
    return true;
  }
}

module.exports = AdminService;
