const mongoContainer = require("../../container/mongoContainer");
const User = require("../../models/User.model");

class userDao extends mongoContainer {
  constructor() {
    super(User);
  }
  async listar() {
    try {
      return await User.find({});
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async crear(email, password) {
    try {
      return await User.create({ email, password });
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async buscarPorId(id) {
    try {
      return await User.findOne({ _id: id });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = userDao;