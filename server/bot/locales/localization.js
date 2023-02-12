const TelegramI18n = require('telegraf-i18n');
const path = require('path');

const i18n = new TelegramI18n({
  directory: path.resolve(__dirname),
  useSession: true,
  sessionName: 'sessionLanguage',
  allowMissing: false,
  defaultLanguage: 'ru',
});

module.exports = i18n;
