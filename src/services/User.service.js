const UserRepository = require('../repositories/User.repository');

class UserService {
  async getCurrentUser(userId) {
    try {
      const user = await UserRepository.getUserById(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async registerUser(userData) {
    try {
      const existingUser = await UserRepository.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      const newUser = await UserRepository.createUser(userData);
      return {
        success: true,
        data: newUser,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async loginUser(email, password) {
    try {
      const user = await UserRepository.getUserByEmailWithPassword(email);
      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new Error('Credenciales inválidas');
      }

      const userDTO = await UserRepository.getUserById(user._id);
      return {
        success: true,
        data: userDTO,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getAllUsers() {
    try {
      const users = await UserRepository.getAllUsers();
      return {
        success: true,
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async updateUser(userId, updateData) {
    try {
      const safeData = { ...updateData };
      delete safeData.password;
      delete safeData.role;

      const updatedUser = await UserRepository.updateUser(userId, safeData);
      if (!updatedUser) {
        throw new Error('Usuario no encontrado');
      }

      return {
        success: true,
        data: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await UserRepository.getUserByEmailWithPassword(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const isPasswordValid = await user.comparePassword(currentPassword);
      if (!isPasswordValid) {
        throw new Error('Contraseña actual incorrecta');
      }

      await UserRepository.updateUser(userId, { password: newPassword });
      return {
        success: true,
        message: 'Contraseña actualizada correctamente',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = new UserService();
