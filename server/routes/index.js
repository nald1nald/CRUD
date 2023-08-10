const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");
const carController = require("../controllers/carController");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");

// Customer Controller
router.post("/create", customerController.createCustomer);
router.get("/", customerController.readCustomer);
router.put("/update", customerController.updateCustomer);
router.delete("/delete/:id", customerController.deleteCustomer);

// Car Controller
router.post("/cars/:customer_id", carController.createCarRecord);
router.get("/customers/:customer_id/cars", carController.readCarRecord);
router.put("/cars/:car_id", carController.updateCarRecord);
router.delete("/cars/:car_id", carController.deleteCarRecord);

// Login, Register Controller
router.post("/register", registerController.registerUser);
router.post("/login", loginController.loginUser);

module.exports = router;
