const login = async (req, res, next) => {
  try {
    const { admin } = req.session;
    res.send({ data: { admin } });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
