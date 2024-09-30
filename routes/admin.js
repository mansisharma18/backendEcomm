const path = require("path");
const express = require("express");
const router = express.Router();
const Product = require("../models/products");

const adminController = require("../controller/products");
const login = require("../controller/UserController");

//get requests

router.post("/login", login);
router.get("/products/all", adminController.getProductsAll);

router.post("/products/add", adminController.postProductsAdd);

router.post("/products/update", adminController.postProductUpdate);

router.post("/products/delete/:id", adminController.postProductDelete);

router.get("/products/:id", adminController.getProductsById);
router.post("/products/addToCart/:id", adminController.addToCart);  // this id is product id.
router.get("/getCart", adminController.getCart);


module.exports = router;
