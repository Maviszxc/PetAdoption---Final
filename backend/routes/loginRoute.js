const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");

router.get("/admin", loginController.login);
router.post("/admin", loginController.login);


module.exports = router;
