const sendService = require('../services/sendService');

const send = async (req, res, next) => {
  try {
    const { id, text, lang } = req.body;
    await sendService.sendMessage(id, text, lang);
    res.end();
  } catch (error) {
    next(error);
  }
};

const massSend = async (req, res, next) => {
  try {
    const { text } = req.body;
    await sendService.sendMessageForAllUsers(text);
    res.end();
  } catch (error) {
    next(error);
  }
};

module.exports = { send, massSend };
