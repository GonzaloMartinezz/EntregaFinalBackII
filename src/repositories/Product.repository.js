const ProductDAO = require('../dao/Product.dao');
const ProductDTO = require('../dto/Product.dto');

class ProductRepository {
  async getAllProducts(filter = {}) {
    const products = await ProductDAO.find(filter);
    return products.map(product => new ProductDTO(product));
  }

  async getProductById(productId) {
    const product = await ProductDAO.findById(productId);
    if (!product) return null;
    return new ProductDTO(product);
  }

  async getProductsByCategory(category) {
    const products = await ProductDAO.find({ category });
    return products.map(product => new ProductDTO(product));
  }

  async createProduct(productData) {
    const product = new ProductDAO(productData);
    await product.save();
    return new ProductDTO(product);
  }

  async updateProduct(productId, updateData) {
    const product = await ProductDAO.findByIdAndUpdate(productId, updateData, { new: true });
    if (!product) return null;
    return new ProductDTO(product);
  }

  async deleteProduct(productId) {
    await ProductDAO.findByIdAndDelete(productId);
  }

  async productExists(productId) {
    const product = await ProductDAO.findById(productId);
    return product !== null;
  }
}

module.exports = new ProductRepository();
