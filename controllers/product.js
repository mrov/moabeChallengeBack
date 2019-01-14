var Products = require('../models/product')

var controller = {
  findAllProducts: (req, res) => {
    Products.find({})
      .then((productsArray) => {
        res.status(200).json(productsArray)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  },
  findAllCategoryProducts: (req, res) => {
    var category = req.params.category;
    Products.find({category: category})
      .then((productsArray) => {
        res.status(200).json(productsArray);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  findProduct: (req, res) => {
    var productName = req.query.productName;
    var productId = req.query.productId;

    if (productName) {
      Products.findOne({name: productName})
        .then((product) => {
          res.status(200).json(product);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else if (productId) {
      Products.findById(productId)
        .then((product) => {
          res.status(200).json(product);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res.status(500).json({msg: "Nenhum parametro recebido"})
    }
  },
  findCategories: (req, res) => {
    Products.find().distinct('category')
      .then(categories => {
        res.status(200).json(categories)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  },
  addProduct: (req, res) => {
    var category = req.query.category;
    var productName = req.query.productName;
    var sales = req.query.sales;

    // Se o usuário nao dizer o numero de vendas, o valor é um random entre 1 e 100
    // Já que é uma aplicação de teste, o ideal seria default 0
    if (!sales) { sales = Math.floor((Math.random() * 100) + 1);}
    
    var newProduct = new Products({ name: productName, category: category, sales: sales });

    newProduct.save(function (err, newProduct) {
      if (err) { res.status(500).json(newProduct) }
      res.status(200).json(newProduct);
    });
  },
  deleteProduct: (req, res) => {
    var productName = req.query.productName;
    var productId = req.query.productId;

    if (productName) {
      Products.deleteOne({name: productName})
        .then((product) => {
          res.status(200).json({msg: "Produto deletado com sucesso"});
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else if (productId) {
      Products.findByIdAndDelete(productId)
        .then((product) => {
          res.status(200).json({msg: "Produto deletado com sucesso"});
        })
        .catch(err => {
          res.status(500).json(err);
        });
      } else {
        res.status(500).json({msg: "Nenhum parametro recebido"})
      }
  }
}

module.exports = controller;