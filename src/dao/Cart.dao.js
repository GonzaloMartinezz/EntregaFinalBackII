const cartModel = require('./models/Cart.model'); 

class CartDAO {
    async getById(id) {
        return await cartModel.findById(id).populate('products.product');
    }

    async create() {
        return await cartModel.create({});
    }

    async addProduct(cid, pid) {
        const cart = await cartModel.findById(cid);
        const product = await cart.products.find(p => p.product._id.equals(pid));
        if (product) product.quantity += 1;
        else cart.products.push({ product: pid, quantity: 1 });
        return await cart.save();
    }
}

module.exports = new CartDAO();