const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");

router.post("/admin", loginController.login);
router.post("/reset-password", loginController.resetPassword); 

router.get("/admins", loginController.getAllAdmins);
router.put("/update/:id", loginController.updateLogin);


module.exports = router;
