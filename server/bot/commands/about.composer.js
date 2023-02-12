const { Composer } = require("telegraf");
const composer = new Composer();
const i18n = require("../locales/localization");


composer.use(i18n);

// Обработчик команды /whoami


composer.command("/about", (ctx) => {
  const { id, username, first_name, last_name } = ctx.from;
  return ctx.replyWithHTML(ctx.i18n.t("about.text"));
});

module.exports = composer;
