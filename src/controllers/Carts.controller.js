const CartService = require('../services/Cart.service'); 

class CartsController {
    async createCart(req, res) {
        try {
            const result = await CartService.create();
            res.status(201).json({ success: true, payload: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getCartById(req, res) {
        try {
            const { cid } = req.params;
            const cart = await CartService.getById(cid);
            if (!cart) return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
            res.json({ success: true, payload: cart });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            // Aquí podrías validar que el producto existe antes de agregarlo
            const result = await CartService.addProduct(cid, pid);
            res.json({ success: true, payload: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async purchase(req, res) {
        try {
            const { cid } = req.params;
            // Esta es la lógica fuerte que profundiza la compra (Generar Ticket)
            const ticket = await CartService.purchase(cid, req.user.email);
            res.json({ success: true, payload: ticket });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new CartsController();