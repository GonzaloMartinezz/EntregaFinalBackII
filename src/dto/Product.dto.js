class ProductDTO {
  constructor(product, includeOwner = false) {
    this._id = product._id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.thumbnail = product.thumbnail;
    this.code = product.code;
    this.stock = product.stock;
    this.category = product.category;
    
    if (includeOwner) {
      this.owner = product.owner;
    }
  }
}

module.exports = ProductDTO;
