const express = require("express");
const router = express.Router();
const {
  upload,
  createPet,
  pets,
  petsByBreed,
  updatePet,
  deletePet,
} = require("../controllers/petController");


const petController = require("../controllers/petController");

router.get("/pets", petController.fetchPets);

router.get("/", petController.pets);
router.get("/breed/:breed", petController.petsByBreed);
router.post("/create", upload.single("image"), petController.createPet);
router.put("/update/:id", petController.updatePet);
router.delete("/delete/:id", petController.deletePet);

module.exports = router;
