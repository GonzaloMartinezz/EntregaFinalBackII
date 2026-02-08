const ProductService = require('../services/Product.service');

class ProductsController {
  async getAllProducts(req, res) {
    try {
      const filters = req.query;
      const result = await ProductService.getAllProducts(filters);

      return res.status(200).json({
        success: result.success,
        payload: result.data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductService.getProductById(id);

      if (result.success) {
        return res.status(200).json({
          success: true,
          payload: result.data,
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async createProduct(req, res) {
    try {
      const { title, description, price, code, stock, category } = req.body;

      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'No autorizado',
        });
      }

      const productData = { title, description, price, code, stock, category };
      const result = await ProductService.createProduct(productData, req.user);

      if (result.success) {
        return res.status(201).json({
          success: true,
          payload: result.data,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'No autorizado',
        });
      }

      const result = await ProductService.updateProduct(id, updateData, req.user);

      if (result.success) {
        return res.status(200).json({
          success: true,
          payload: result.data,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'No autorizado',
        });
      }

      const result = await ProductService.deleteProduct(id, req.user);

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getProductPrice(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductService.getProductPrice(id, req.user);

      if (result.success) {
        return res.status(200).json({
          success: true,
          payload: result.data,
        });
      } else {
        return res.status(404).json({
          success: false,
          error: result.error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new ProductsController();
