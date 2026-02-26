const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/Products.controller');
// Importamos authorization para manejar roles dinámicamente
const { verifyJWT, authorization } = require('../middlewares/auth.middleware');

// Rutas Públicas: Cualquiera puede ver los productos
router.get('/', (req, res) => {
  ProductsController.getAllProducts(req, res);
});

router.get('/:id', (req, res) => {
  ProductsController.getProductById(req, res);
});

router.get('/:id/price', (req, res) => {
  ProductsController.getProductPrice(req, res);
});

// --- Rutas Protegidas: Solo para ADMINISTRADORES ---
// Consigna: "Solo el administrador puede crear, actualizar y eliminar productos"

router.post('/', verifyJWT, authorization(['admin']), (req, res) => {
  ProductsController.createProduct(req, res);
});

router.put('/:id', verifyJWT, authorization(['admin']), (req, res) => {
  ProductsController.updateProduct(req, res);
});

router.delete('/:id', verifyJWT, authorization(['admin']), (req, res) => {
  ProductsController.deleteProduct(req, res);
});

module.exports = router;