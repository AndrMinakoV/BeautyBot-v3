const { Telegraf } = require('telegraf');
const fsp = require('fs/promises');
const path = require('path');

const client = new Telegraf(process.env.BOT_TOKEN);

const initClient = async () => {
  const basePath = path.join(__dirname, 'commands');
  const filesPaths = (await fsp.readdir(basePath))
    .filter((file) => file.endsWith('.js'))
    .filter((file) => file !== 'logging.composer.js');

  const composes = filesPaths.map((el) => require(path.join(basePath, el)));

  const loggingComposer = require(path.join(
    basePath,
    'logging',
    'logging.composer.js'
  ));
  client.use(...composes, loggingComposer);
  client.use(loggingComposer); //logs
};

initClient();

module.exports = client;
