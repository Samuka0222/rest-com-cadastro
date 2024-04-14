const express = require('express');
const products = require("./productsRoute.js");
const users = require("./usersRoute.js")
const auth = require("./authRoute.js")

module.exports = app => {
  app.use(
    express.json(),
    products,
    auth,
    users
  )
}