const UserDTO = require('../dto/User.dto');

class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getUserInfo(id) {
        const user = await this.dao.getById(id);
        return new UserDTO(user); // Aquí ocurre la magia del DTO
    }
}

module.exports = UserRepository;