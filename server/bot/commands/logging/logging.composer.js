const { Composer } = require('telegraf')
const composer = new Composer()
const date = require('date-and-time');
const now = new Date();
const fs = require("fs")


// //Обработчик простого текста
// composer.on("text", (ctx) => {
//     const { id, username, first_name, last_name } = ctx.from;
//     //return ctx.replyWithMarkdown(`Извините, команда \`${ctx.message.text}\` не распознана.`),
//     console.log(`Пользователь ${username} | id ${id} отправил сообщение: ` + ctx.message.text),
 
//     //fs.appendFileSync("./logs/log.txt", `Пользователь ${username} | id ${id} отправил сообщение: ` + ctx.message.text +`\n`),
//     fs.appendFileSync(`./logs/${date.format(now, 'ddd, MMM DD YYYY')}.ini`, 
//     `Пользователь ${username} | id ${id} отправил сообщение: ` + ctx.message.text + 
//     ` | Дата : ${date.format(now, 'YYYY/MM/DD HH:mm:ss')}` + `\n`, function(error){
//         if(error) console.log(error); // если возникла ошибка
     
//     });
 
//   });

//   //работа с логгированием
//   const logs = `./logs/${date.format(now, 'ddd, MMM DD YYYY')}.ini`;
  
//   if (!fs.existsSync("./logs")) {
//     fs.writeFileSync("./logs", `New log from ${date.format(now, 'YYYY/MM/DD HH:mm:ss')}\n`, 'utf8');
//   }
  
//  const usersLog = `./logs/usersLog/${date.format(now, 'ddd, MMM DD YYYY')}.ini`;
 
//  if (!fs.existsSync(usersLog)) {
//    fs.writeFileSync(usersLog, `New log from ${date.format(now, 'YYYY/MM/DD HH:mm:ss')}\n`, 'utf8');
//  }


module.exports = composer