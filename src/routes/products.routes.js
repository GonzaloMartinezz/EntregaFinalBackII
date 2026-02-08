const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/Products.controller');
const { verifyJWT, verifyPremium } = require('../middlewares/auth.middleware');

router.get('/', (req, res) => {
  ProductsController.getAllProducts(req, res);
});

router.get('/:id', (req, res) => {
  ProductsController.getProductById(req, res);
});

router.post('/', verifyJWT, verifyPremium, (req, res) => {
  ProductsController.createProduct(req, res);
});

router.put('/:id', verifyJWT, (req, res) => {
  ProductsController.updateProduct(req, res);
});

router.delete('/:id', verifyJWT, (req, res) => {
  ProductsController.deleteProduct(req, res);
});

router.get('/:id/price', (req, res) => {
  ProductsController.getProductPrice(req, res);
});

module.exports = router;
