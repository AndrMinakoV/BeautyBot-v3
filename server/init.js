const bot = require('./bot/client');
const mongoose = require('mongoose');
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);

// bot.launch(
//   console.log('\x1b[36m%s\x1b[0m', `Клиент запущен. Подгруженные команды:`)
// );
