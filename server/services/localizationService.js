const i18n = require('../bot/locales/localization');
const CategoryModel = require('../models/category');
const ItemModel = require('../models/item');

class LocalizationService {
  constructor() {
    this.itemModel = ItemModel;
    this.categoryModel = CategoryModel;
    this.i18n = i18n;
  }

  async updateLocalization(lang, token, value) {
    this.i18n.loadLocale(lang, { [token]: value });
  }

  async updateAllLocalizations() {
    const itemsLocalizations = await this.itemModel.find({});
    const categoryLocalizations = await this.categoryModel.find({});
    const localizationsObject = [
      ...itemsLocalizations,
      ...categoryLocalizations,
    ]
      .filter((el) => el.localization)
      .reduce((acc, local) => {
        const lang = local.lang;
        const obj = { [local.key]: local.value };
        if (acc[lang]) {
          acc[lang].push(obj);
        } else {
          acc[lang] = [obj];
        }
        return acc;
      }, {});
    // TODO Check
    console.log(localizationsObject);
    this.i18n.loadLocale('ru', localizationsObject['ru']);
    this.i18n.loadLocale('uk', localizationsObject['uk']);
  }
}

module.exports = LocalizationService;
