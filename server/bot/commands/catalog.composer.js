const { Composer, Markup } = require('telegraf');
const composer = new Composer();
const i18n = require('../locales/localization');
const mongoose = require('mongoose');
const UserModel = require('../../models/user');
const OrderModel = require('../../models/order');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);

const categories = [];
const a = ['a', 'b', 'c'];

categories.push('hand_milk');

const db = mongoose.connection;
db.on('error', (err) => {
  console.log('error', err);
});
db.once('open', () => {
  console.log('\x1b[36m%s\x1b[0m', 'Связь с MongoDB установлена. (Catalog)');
});

composer.use(i18n);
let item1;
let username;
let id;
let first_name;
let weight;
let adres;

composer.on('text', async (ctx, next) => {
  if (ctx.message.text == ctx.i18n.t('main_menu.catalog')) {
    await ctx.reply(
      'Выберите средство, которое вам нужно.',
      Markup.keyboard(categories),
      (id = ctx.from.id),
      (username = ctx.from.username),
      (first_name = ctx.from.first_name)
    );

    //ctx.telegram.sendMessage((ctx.message.chat.id, "-859376782"), `Пользователь ${ctx.from.username} нажал кнопку ${ctx.message.text}`)
  }
  next();
});

composer.on('text', async (ctx, next) => {
  if (ctx.message.text == 'МОЛОЧКО ДЛЯ ОЧИЩЕННЯ РЕМУВЕР') {
    await ctx.reply(
      'Выберите количество грамм. \n Примечание: Количество фиксированно, своё количество указывать нельзя.\n\n1 грамм: 2 гривны',
      Markup.keyboard([
        ['30 грамм', '50 грамм', '70 грамм'],
        ['100 грамм', '150 грамм', '350 грамм'],
      ])
        .oneTime(true)
        .resize(true)
    );
    item1 = ctx.message.text;
    //ctx.telegram.sendMessage((ctx.message.chat.id, "-859376782"), `Пользователь ${ctx.from.username} нажал кнопку ${ctx.message.text}`)
  } //weight = ctx.message.text
  next();
});

composer.on('text', async (ctx, next) => {
  if (ctx.message.text === '30 грамм') {
    await ctx.reply(`Заказ оформлен!`);
    const userBd = await UserModel.findOne({ _id: id });
    ctx.telegram.sendMessage(
      (ctx.message.chat.id, '-859376782'),
      `Пользователь ${username} оформил заказ под номером 1!
    Имя: ${username}
    Предмет: ${item1}
    Айди пользователя: ${id}
    Имя пользователя: ${first_name}
    Вес: ${weight}
    Адрес: ${adres}
    Номер телефона: ${userBd.contact}`
    );
    console.log(userBd.contact);
  }

  next();
});

const order = new OrderModel({
  username: username,
  _id: id,
  first_name: first_name,
  item: item1,
  adres: adres,
});
console.log('order', order);
order.save((err, order) => {});

//composer.on("text", async (ctx, next) => {
//  if (ctx.message.text == ctx.i18n.t("main_menu.catalog")) {
//    await ctx.reply("Добавлено в очередь.");
//    ctx.telegram.sendMessage((ctx.message.chat.id, "-859376782"), "test message")
//  }
//  next()
//});

module.exports = composer;
