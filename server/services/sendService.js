const client = require('../bot/client');
const i18n = require('../bot/locales/localization');

const worker = async ({ id, text }) =>
  await client.telegram.sendMessage(id, text);

class SendService {
  constructor() {
    this._queue = require('fastq').promise(worker, 15);
    this.i18n = i18n;
  }
  async sendMessage(id, text, lang) {
    try {
      await this._queue.push({ id, text: this.i18n.t(lang, text) });
    } catch (error) {
      console.error(error);
    }
  }
}

const sendService = new SendService();

module.exports = sendService;
