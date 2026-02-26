const cartModel = require('./models/Cart.model'); // El ./ busca en la carpeta models que está al lado

class CartDAO {
    async getById(id) {
        return await cartModel.findById(id).populate('products.product');
    }
    // ... tus otros métodos
}

module.exports = new CartDAO();