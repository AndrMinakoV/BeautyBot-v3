const i18n = require('../bot/locales/localization');
const ItemModel = require('../models/category');
const LocalizationService = require('./localizationService');

class ItemService {
  constructor() {
    this.model = ItemModel;
    this.localizationService = new LocalizationService(i18n);
  }

  async addItem({ name, ukName }) {
    const category = new this.model({ name });
    await category.save();
    await this.localizationService.updateLocalization('ru', name, name);
    await this.localizationService.updateLocalization('uk', name, ukName);
  }
  async getAll() {
    const items = await this.model.find({});
    return items;
  }
}

module.exports = ItemService;
