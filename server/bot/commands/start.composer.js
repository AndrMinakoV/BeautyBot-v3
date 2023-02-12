const { Scenes, Markup, Composer } = require("telegraf");
const i18n = require("../locales/localization");
const fs = require("fs");
const date = require("date-and-time");
const now = new Date();
const composer = new Composer();

composer.command("start", async (ctx) => {
  //вход в стартовую сцену
  await ctx.replyWithHTML(
    ctx.i18n.t("start.text", { username: ctx.from.username }),
    Markup.keyboard([
      [Markup.button.callback(ctx.i18n.t("start.textQuestionData"))],
    ])
      .oneTime(true)
      .resize(true)
  );
});


composer.on("text", async (ctx, next) => {
  //console.log(ctx.message.from, "NAPISAL", ctx.message.text);
  if (ctx.message.text == ctx.i18n.t("start.textQuestionData")) {
    // кнопка с подтверждением прав конфиденциальности
    const { id, username, first_name, last_name } = ctx.from;
    if (ctx.message.text === "start") {
    } else {
      await ctx.replyWithHTML(
        ctx.i18n.t("start.textAfterDataQuestion", {
          id: id,
          first_name: first_name,
          last_name: last_name || username,
          contact: ctx.i18n.t("start.textPrivacyPolicy"),
        }),
        Markup.keyboard([
          [
            {
              text: ctx.i18n.t("start.textPhone"),
              request_contact: true,
            },
          ],
          [Markup.button.callback(ctx.i18n.t("start.textDecline"))],
        ])
          .oneTime(true)
          .resize(true)
      );
    }
  }   next()
});

composer.on("text", async (ctx, next) => {
  if (ctx.message.text == ctx.i18n.t("start.textDecline")) {
    await ctx.reply(
      ctx.i18n.t("start.textAfterDecline"),
      Markup.keyboard([
        [
          {
            text: "/start",
          },
        ],
      ])
        .oneTime(true)
        .resize(true)
    );
  }   next()
});


module.exports = composer;
