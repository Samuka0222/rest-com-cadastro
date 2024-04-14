const express = require('express');
const products = require("./productsRoute.js");
const users = require("./usersRoute.js")
const auth = require("./authRoute.js")
const roles = require("./rolesRoute.js")

module.exports = app => {
  app.use(
    express.json(),
    auth,
    products,
    users,
    roles
  )
}