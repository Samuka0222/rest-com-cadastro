const express = require('express');
const products = require("./productsRoute.js");

module.exports = app => {
  app.use(
    express.json(),
    products
  )
}