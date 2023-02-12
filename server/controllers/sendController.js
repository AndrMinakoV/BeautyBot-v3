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

module.exports = { send };
