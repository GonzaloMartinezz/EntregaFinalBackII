const ProductRepository = require('../repositories/Product.repository');

class ProductService {
  async getAllProducts(filters = {}) {
    try {
      const products = await ProductRepository.getAllProducts(filters);
      return {
        success: true,
        data: products,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getProductById(productId) {
    try {
      const product = await ProductRepository.getProductById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      return {
        success: true,
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async createProduct(productData, user) {
    try {
      if (user.role !== 'premium' && user.role !== 'admin') {
        throw new Error('Solo usuarios premium pueden crear productos');
      }

      if (!productData.title || !productData.price || !productData.code) {
        throw new Error('Faltan campos requeridos');
      }

      productData.owner = user._id;

      const newProduct = await ProductRepository.createProduct(productData);
      return {
        success: true,
        data: newProduct,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async updateProduct(productId, updateData, user) {
    try {
      const product = await ProductRepository.getProductById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      if (product.owner !== user._id && user.role !== 'admin') {
        throw new Error('No tienes permiso para actualizar este producto');
      }

      const updatedProduct = await ProductRepository.updateProduct(productId, updateData);
      return {
        success: true,
        data: updatedProduct,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async deleteProduct(productId, user) {
    try {
      const product = await ProductRepository.getProductById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      if (product.owner !== user._id && user.role !== 'admin') {
        throw new Error('No tienes permiso para eliminar este producto');
      }

      await ProductRepository.deleteProduct(productId);
      return {
        success: true,
        message: 'Producto eliminado',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getProductPrice(productId, user) {
    try {
      const product = await ProductRepository.getProductById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      let finalPrice = product.price;

      if (user && user.role === 'premium') {
        finalPrice = product.price * 0.9;
      }

      return {
        success: true,
        data: {
          ...product,
          originalPrice: product.price,
          finalPrice: finalPrice,
          discount: user?.role === 'premium' ? '10%' : null,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = new ProductService();
