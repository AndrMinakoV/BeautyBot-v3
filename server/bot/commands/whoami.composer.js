const { Composer } = require('telegraf')
const composer = new Composer()
const path = require('path')
const i18n = require("../locales/localization");
composer.use(i18n);


// Обработчик команды /whoami
composer.command("/whoami", (ctx) => {
    const { id, username, first_name, last_name } = ctx.from;
    return ctx.replyWithHTML(ctx.i18n.t("whoami.text", {
      username: username,
      id: id,
      first_name: first_name,
      last_name: last_name || "Non Provided."
    }))
  })

module.exports = composer