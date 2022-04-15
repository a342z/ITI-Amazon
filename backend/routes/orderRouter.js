const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
isAuth=require("./../MW/auth");
const controller = require("./../controllers/orderController");


router
// GET> /orders > FOR ADMIN
.route("/")
.get(isAuth, controller.getOrders)
// POST> /orders > ADD a new order
.post(
    isAuth,
    [
    body("customerID").isString().withMessage("enter Valid ID"),
    body("customerName").isString().withMessage("enter Valid Name"),
    body("phoneNumber").notEmpty().withMessage("invalid PhoneNumber."),
    body("shippingAddress").isObject().withMessage("Address should be an object"),
    body("shippingAddress.country").isString().withMessage("enter correct country"),
    body("shippingAddress.city").isString().withMessage("enter correct city"),
    body("shippingAddress.street").isString().withMessage("enter correct street"),
    body("shippingAddress.postalCode").isAlphanumeric().withMessage("enter postalCode"),
    body("shippingAddress.building").isString().withMessage("enter correct building"),
    body("orderStatus").isString().withMessage("enter orderStatus"),
    body("paymentType").isString().withMessage("enter paymentType"),
    ],
    controller.createOrders
);

// router.route("/my-order").get(isAuth, controller.getMyOrders);

// GET> /orders/:id > Get Some Order for customer
router.route("/customer/:customerId").get(isAuth, controller.getMyOrdersByID);
//Delete an order
router.route("/:id").delete(isAuth, controller.deleteOrder);

//TODO Later
// router.route("/:id/pay").put(isAuth, controller.updateOrderToPaid);

// PUT> /orders/:id  >FOR ADMIN >>update Status 
router.route("/:id/order-status")
        .put(isAuth,[
            body("orderStatus").isString().withMessage("enter orderStatus"),
        ], controller.updateOrderStatus);

module.exports = router;
//UPDATE ORDER
router.put("/:id",isAuth,controller.updateOrder)

//GET ORDER
router.get("/:id",isAuth,controller.getOrder)

