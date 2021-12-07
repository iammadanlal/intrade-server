const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post("/signup", authController.SignUpUser);
router.post("/companySignup", authController.SignUpCompany);
router.post("/login", authController.LoginUser);
router.post("/forgetPassword", authController.ForgetPassword);
router.post("/users", authController.getAllUsers);

module.exports = router;
