const prepareAdminObj = (admin) => ({
  id: admin._id,
  isSuper: admin.isSuper,
});

module.exports = prepareAdminObj;
