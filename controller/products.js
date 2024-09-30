//require the database
const Products = require("../models/products");
const Users = require("../models/UserModel");

module.exports.postProductsAdd = async (req, res, next) => {
  const { name, price, description, imageUrl, seller } = req.body;

  await Products.create({
    name,
    price,
    description,
    seller,
    imageUrl,
  });
  res.redirect("/admin/products/all");
};

module.exports.getProductsAll = async (req, res, next) => {
  const products = await Products.find();
  res.send(products);
  console.log("user req", req.user.id);
};

module.exports.getProductsById = async (req, res) => {
  console.log("Api hit");

  const productId = req.params.id;
  console.log("id", productId);
  const products = await Products.find({ _id: productId });
  res.send(products);
};

module.exports.postProductUpdate = async (req, res, next) => {
  const { name, price, description, imageUrl, seller, id } = req.body;

  let p = await Products.findById(id);

  p.name = name;
  p.price = price;
  p.description = description;
  p.imageUrl = imageUrl;
  p.seller = seller;

  await p.save();
  res.redirect("/admin/products/all");
};

module.exports.postProductDelete = async (req, res, next) => {
  const { id } = req.params;

  await Products.deleteOne({ _id: id });

  res.redirect("/admin/products/all");
};

module.exports.addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    let cart = await req.user.cart;
    let indx = -1;
    cart.forEach((item, i) => {
      if (item.id == id) {
        indx = i;
      }
    });
    if (indx == -1) {
      cart.unshift({
        id: id,
        quantity: 1,
      });
    } else {
      cart[indx].quantity++;
    }

    // To make sure that db mei changes ho jaaye we need to save it
    await req.user.save(); // Make sure to use await here
    console.log(req.user); // I assume 'user' here is 'req.user'
    res.send(req.user); // Sending the modified user object as response
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error"); // Sending a 500 status in case of error
  }
};

module.exports.getCart = async (req, res, next) => {
  try {
    console.log("cart get request hit");
    let user = await Users.findOne({ _id: req.user._id }).populate('cart.id');
     console.log(user.cart)
     res.send(user.cart)

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
