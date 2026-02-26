const express = require('express');
const router = express.Router();

const CartsController = require('../controllers/Carts.controller');
const { verifyJWT, authorization } = require('../middlewares/auth.middleware');

// Crear un carrito nuevo (Cualquier usuario logueado)
router.post('/', verifyJWT, (req, res) => {
    CartsController.createCart(req, res);
});

// Ver un carrito específico
router.get('/:cid', verifyJWT, (req, res) => {
    CartsController.getCartById(req, res);
});

// --- CONSIGNHA: Solo el usuario puede agregar productos a su carrito ---
// Usamos authorization(['user']) para bloquear a admins o premiums si así lo deseas
router.post('/:cid/product/:pid', verifyJWT, authorization(['user']), (req, res) => {
    CartsController.addProductToCart(req, res);
});

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', verifyJWT, authorization(['user']), (req, res) => {
    CartsController.deleteProductFromCart(req, res);
});

// Finalizar proceso de compra (Generar Ticket)
router.post('/:cid/purchase', verifyJWT, authorization(['user']), (req, res) => {
    CartsController.purchase(req, res);
});

module.exports = router;