const express = require("express");
const Category = require("../models/Category");
const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { ObjectId } = require("mongodb");
module.exports.postSignUp = async (req, res) => {
  try {
    let { username, password } = req.body;
    let cartid = new ObjectId();
    let user = await User.create({
      username: username,
      password: password,
      orders: [],
      cart: cartid,
    });
    await Cart.create({
      _id: cartid,
      products: [],
    });
    res.send("sign up successful");
  } catch (err) {
    console.log(err);
  }
};
module.exports.getSuccess = async (req, res) => {
  try {
    console.log("success");
    res.send("authenticated");
  } catch (err) {
    console.log(err);
  }
};
module.exports.getFailure = async (req, res) => {
  try {
    console.log("failure");
    res.send("not authenticated");
  } catch (err) {
    console.log(err);
  }
};
module.exports.postCategory = async (req, res) => {
  try {
    if (req.user.username == "admin123" && req.user.password == "321") {
      let { title } = req.body;
      await Category.create({ title: title, product: [] });
      res.send("successful");
    } else {
      res.send("not authorized to add categories");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.postProducts = async (req, res) => {
  try {
    if (req.user.username == "admin123" && req.user.password == "321") {
      let {
        title,
        price,
        description,
        detailedDescription,
        availability,
        category,
      } = req.body;
      let product = {
        title,
        price,
        description,
        detailedDescription,
        availability,
        category,
      };
      //create product
      let createdentry = await Product.create(product);
      //add in category
      //find category document
      console.log(category);
      let categoryM = await Category.find({ _id: new ObjectId(category) });
      let productcategoryM = categoryM[0].products;
      productcategoryM.push(createdentry._id);
      //update category
      await Category.updateOne(
        { _id: category },
        { products: productcategoryM }
      );
      res.send("successful");
    } else {
      res.send("not authorized to add products");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.getCategories = async (req, res) => {
  try {
    let categories = await Category.find();
    res.send(categories);
  } catch (err) {
    console.log(err);
  }
};
module.exports.getProducts = async (req, res) => {
  try {
    let categoryId = req.body.id;
    //find products
    let category = await Category.findOne({ _id: categoryId }).populate(
      "products"
    );
    //populate it with product information
    res.send(category.products);
  } catch (err) {
    console.log(err);
  }
};
module.exports.getProduct = async (req, res) => {
  try {
    let productId = req.body.id;
    let product = await Product.findOne({ _id: productId });
    if (product) {
      res.send(product);
    } else {
      res.send("invalid product id");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.postUpdateCart = async (req, res) => {
  try {
    if (req.user) {
      let { productId, quantity } = req.body;
      let user = await User.findOne({ _id: req.user.id });
      //update cart db
      let cartId = user.cart;
      let cart = await Cart.findOne({ _id: cartId });
      let i = 0;
      let products = cart.products;
      while (i < products.length) {
        if (products[i].product == productId) {
          products[i].quantity = quantity;
          break;
        }
        i += 1;
      }
      //make changes in actual cart
      await Cart.updateOne({ _id: cartId }, { products: products });
      res.send("successful");
    } else {
      res.send("user not authenticated");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.postViewCart = async (req, res) => {
  try {
    if (req.user) {
      let user = await User.findOne({ _id: req.user.id }).populate("cart");
      let cartDetails = user.cart;
      res.send(cartDetails);
    } else {
      res.send("user not authenticated");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.postAddItems = async (req, res) => {
  try {
    if (req.user) {
      let { productId, quantity } = req.body;
      let user = await User.findOne({ _id: req.user.id });
      let cartId = user.cart;
      let cart = await Cart.findOne({ _id: cartId });
      let products = cart.products;

      products.push({
        product: productId,
        quantity: quantity,
      });

      //update cart
      await Cart.updateOne({ _id: cartId }, { products: products });
      res.send("successful");
    } else {
      res.send("user not authenticated");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.deleteItems = async (req, res) => {
  try {
    if (req.user) {
      let cartid = req.params.cartId;
      let itemid = req.params.itemId;
      //fetch cart
      let cart = await Cart.findOne({ _id: cartid });
      let products = cart.products;
      let updatedproducts = products.filter((item) => item.product != itemid);
      await Cart.updateOne({ _id: cartid }, { products: updatedproducts });
      res.send("successful");
    } else {
      res.send("user not authenticated");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.postPlaceOrder = async (req, res) => {
  try {
    if (req.user) {
      let { cartId } = req.body;
      //remove all items from cart and add it in orders
      let orderDet = await Cart.findOne({ _id: cartId });
      orderDet = orderDet.products;
      //insert in order collection
      let order = await Order.create({ items: orderDet });
      // //insert in user
      let user = await User.findOne({ _id: req.user.id });
      // //append order id
      let orders = user.orders;
      orders.push(order._id);
      await User.updateOne({ _id: user._id }, { orders: orders });
      // //remove all items from cart
      await Cart.updateOne({ _id: cartId }, { products: [] });
      res.send("successful");
    } else {
      res.send("user not authenticated");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.postOrderHistory = async (req, res) => {
  try {
    if (req.user) {
      let user = await User.findOne({ _id: req.user.id }).populate({
        path: "orders",
        populate: {
          path: "items.product",
          model: "products",
        },
      });
      if (user.orders.length > 0) {
        res.send(user.orders);
      } else {
        res.send("no orders placed");
      }
    } else {
      res.send("user not authenticated");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.postOrderDetails = async (req, res) => {
  try {
    if (req.user) {
      let orderId = req.body.orderid;
      let order = await Order.findOne({ _id: orderId }).populate({
        path: "items.product",
        model: "products",
      });
      res.send(order);
    } else {
      res.send("user not authenticated");
    }
  } catch (err) {
    console.log(err);
  }
};
