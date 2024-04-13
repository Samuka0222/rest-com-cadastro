const productService = require("../services/productService.js");

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(400).send({ mesage: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(400).send({ mesage: error.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const { data } = req.body;
      const newProduct = await productService.createProduct(data);
      res.status(201).json(newProduct);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { ...data } = req.body;
      const updatedProduct = await productService.updateProduct(id, data);
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id);
      res.status(200).send({ message: "Produto deletado com sucesso!"});
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = ProductController;
