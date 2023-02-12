const { Composer, Markup, Scenes, session } = require("telegraf");
const composer = new Composer();
const fs = require("fs");
const date = require("date-and-time");
const now = new Date();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log("error", err);
});
db.once("open", () => {
  console.log("\x1b[36m%s\x1b[0m", "Связь с MongoDB установлена. (Contact)");
});

composer.on("contact", (ctx, next) => {
  const contact = ctx.message.contact.phone_number;
  const User = require("../models/user");
  const { id, username, first_name, last_name} = ctx.from;
  const chatID = ctx.message.chat.id
  const user = new User({
    username: username,
    _id: id,
    first_name: first_name,
    last_name: "Не указана.",
    contact: contact,
    chatID: chatID
  });
  console.log("user", user);
  user.save((err, user) => {
    console.log("saved user", user || "already exists"),
      ctx.replyWithHTML(
        ctx.i18n.t("start.textPhoneApproved"),
        Markup.keyboard([
          [
            {
              text: ctx.i18n.t("main_menu.catalog"),
            },
          ],
          [
            {
              text: ctx.i18n.t("main_menu.balance"),
            },
            {
              text: ctx.i18n.t("main_menu.myOrders"),
            },
          ],
          [
            {
              text: ctx.i18n.t("main_menu.box"),
            },
          ],
          [
            {
              text: ctx.i18n.t("main_menu.notifications"),
            },
            {
              text: ctx.i18n.t("main_menu.help"),
            },
          ],
        ])       .oneTime(true)
        .resize(true)
      ),
      fs.appendFile(
        `./logs/usersLog/${date.format(now, "ddd, MMM DD YYYY")}.ini`,
        ctx.from.id +
          ` | Дата : ${date.format(now, "YYYY/MM/DD HH:mm:ss")}` +
          `\n Phone number: ${contact}
                 \n`,
        function (error) {
          if (error) throw error; // если возникла ошибка
        }
      );
  });
  next();
});

module.exports = composer;
