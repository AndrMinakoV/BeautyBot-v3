const UserModel = require('../models/user');

class Userservice {
  constructor() {
    this.model = UserModel;
  }
  async addUser({ id, contact, name }) {
    const isUserExist = await this.findUserById(id);
    if (isUserExist) return;
    const newUser = new this.model({ _id: id, contact, name });
    await newUser.save();
  }

  async findAll(){
    return await this.model.find({})
  }
  
  async findUserById(id) {
    const user = await this.model.findById(id);
    return user ? user : null;
  }
}

module.exports = Userservice;
