const express = require("express");
const passport = require("passport");
const controller = require("../controller/controller");
const router = express.Router();
//register
router.post("/signUp", controller.postSignUp);
//login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);
router.get("/success", controller.getSuccess);
router.get("/failure", controller.getFailure);
// routes
//insert category
router.post("/category", controller.postCategory);
//insert product in category and product collections
router.post("/postProducts", controller.postProducts);
//get categories
router.get("/categories", controller.getCategories);
//get products by category id
router.post("/products", controller.getProducts);
//fetch specific product using product id
router.post("/product", controller.getProduct);
//cart specific endpoints
router.post("/updateCart", controller.postUpdateCart);
router.post("/viewCart", controller.postViewCart);
router.post("/additems", controller.postAddItems);
//remove from cart
router.delete("/cart/:cartId/items/:itemId/remove", controller.deleteItems);
// order management routes
router.post("/placeOrder", controller.postPlaceOrder);
//fetch order history
router.post("/orderHistory", controller.postOrderHistory);
//order details
router.post("/orderDetails", controller.postOrderDetails);
//authentication left
module.exports = router;
