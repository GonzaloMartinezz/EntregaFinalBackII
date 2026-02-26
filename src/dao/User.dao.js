const User = require('./models/User.model'); // Importas el modelo anterior

class UserDAO {
    async getById(id) {
        return await User.findById(id).populate('cart');
    }

    async getByEmail(email) {
        return await User.findOne({ email });
    }

    async create(userData) {
        return await User.create(userData);
    }

    async update(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true });
    }
}

module.exports = new UserDAO();
