const { Composer } = require('telegraf')
const composer = new Composer()
const path = require('path')
const i18n = require("../locales/localization");
composer.use(i18n);


// Обработчик команды /whoami
composer.command("/admin", async (ctx) => {
    const User = require('../models/user')
    const userBd = await User.find();
    userBd.forEach(function(user) {
        ctx.telegram.sendMessage((ctx.message.chat.id, user._id), `Важное оповещение! Сообщение от администратора: \n${ctx.message.text.substring(6)}`)
    })
    return ctx.replyWithHTML(`Оповещение отправлено. Содержание:\n ${ctx.message.text.substring(6)}`)
  })

module.exports = composer