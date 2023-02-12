const i18n = require('../bot/locales/localization');
const CategoryModel = require('../models/category');
const LocalizationService = require('./localizationService');

class CategoryService {
  constructor() {
    this.model = CategoryModel;
    this.localizationService = new LocalizationService(i18n);
  }

  async getAll() {
    const categories = await this.model.find({});
    return categories;
  }

  async addCategory({ name, ukName }) {
    const category = new this.model({
      name,
      localization: { ru: name, uk: ukName },
    });
    await category.save();
    await this.localizationService.updateLocalization('ru', name, name);
    await this.localizationService.updateLocalization('uk', name, ukName);
  }
}

module.exports = CategoryService;
