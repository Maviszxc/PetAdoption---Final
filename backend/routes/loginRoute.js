const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.post("/", loginController.login);
router.get("/admin", loginController.Admin);
router.post("/reset-password", loginController.resetPassword);

module.exports = router;
