const UserDAO = require('../dao/User.dao');
const UserDTO = require('../dto/User.dto');

class UserRepository {
  async getUserById(userId) {
    const user = await UserDAO.findById(userId);
    if (!user) return null;
    return new UserDTO(user);
  }

  async getUserByEmail(email) {
    const user = await UserDAO.findOne({ email: email.toLowerCase() });
    if (!user) return null;
    return new UserDTO(user);
  }

  async getUserByEmailWithPassword(email) {
    const user = await UserDAO.findOne({ email: email.toLowerCase() });
    return user;
  }

  async createUser(userData) {
    const user = new UserDAO(userData);
    await user.save();
    return new UserDTO(user);
  }

  async getAllUsers() {
    const users = await UserDAO.find();
    return users.map(user => new UserDTO(user));
  }

  async updateUser(userId, updateData) {
    const user = await UserDAO.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) return null;
    return new UserDTO(user);
  }

  async deleteUser(userId) {
    await UserDAO.findByIdAndDelete(userId);
  }
}

module.exports = new UserRepository();
