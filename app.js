const express = require('express');
const productController = require('./controllers/product');
const cors = require('cors');
var mongoose = require('mongoose');
var app = express();
var db = mongoose.connection;

mongoose.set('debug', true);
mongoose.connect('mongodb://root:root123@ds263948.mlab.com:63948/challange', { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'connection error:'));

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/categories', productController.findCategories);
app.get('/product', productController.findProduct);
app.get('/products', productController.findAllProducts)
app.get('/products/:category', productController.findAllCategoryProducts);
app.post('/products', productController.addProduct);
app.delete('/products', productController.deleteProduct);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});