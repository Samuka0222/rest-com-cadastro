const express = require('express');
const products = require("./productsRoute.js");
const users = require("./usersRoute.js")

module.exports = app => {
  app.use(
    express.json(),
    products,
    users
  )
}