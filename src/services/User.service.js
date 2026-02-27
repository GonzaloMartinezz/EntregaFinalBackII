const UserRepository = require('../repositories/User.repository');
const UserDAO = require('../dao/User.dao');

class UserService {

  // NUEVO: Buscar usuario por email (necesario para el mail de recuperación)
  async getUserByEmail(email) {
    try {
      const user = await UserDAO.getByEmail(email);
      if (!user) throw new Error('Usuario no encontrado');
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // NUEVO: Lógica de reseteo de contraseña (Consigna: No usar la misma anterior)
  async updatePasswordFromToken(email, newPassword) {
    try {
      // 1. Buscamos al usuario incluyendo el password actual para comparar
      const user = await UserDAO.getByEmail(email); 
      if (!user) throw new Error('Usuario no encontrado');

      // 2. CONSIGNHA: Evitar que el usuario restablezca a la misma contraseña
      const isSamePassword = await user.comparePassword(newPassword);
      if (isSamePassword) {
        throw new Error('No puedes usar la misma contraseña que ya tenías');
      }

      // 3. Actualizamos. El middleware .pre('save') del modelo hará el hash
      user.password = newPassword;
      await user.save();

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = new UserService();