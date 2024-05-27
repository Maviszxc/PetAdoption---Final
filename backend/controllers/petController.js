const Pet = require("../models/petSchema"); // Ensure the path is correct

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports.upload = upload;

module.exports.createPet = async (req, res) => {
  try {
    const { breed, gender, age, description } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const newPet = new Pet({
      breed,
      gender,
      age,
      description,
      image: imageUrl,
      isAdopted: false,
    });

    const savedPet = await newPet.save();
    res.status(201).json({ success: true, pet: savedPet });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: error.message || "Internal Server Error",
      });
  }
};

module.exports.pets = (req, res) => {
  Pet.find({ isAdopted: false })
    .then((pets) => res.send(pets))
    .catch((error) => res.send(error));
};

module.exports.fetchPets = (req, res) => {
  Pet.find({})
    .then((pets) => res.status(200).json(pets))
    .catch((error) => res.status(500).json({ error: error.message }));
};

module.exports.petsByBreed = (req, res) => {
  const breed = req.params.breed;
  console.log(`Searching pets by breed: ${breed}`);
  Pet.find({ isAdopted: false, breed: breed })
    .then((pets) => {
      console.log("Pets found by breed:", pets);
      if (!pets || pets.length === 0) {
        return res
          .status(404)
          .json({ message: "Pets not found for this breed" });
      }
      res.status(200).json(pets);
    })
    .catch((error) => {
      console.error("Error fetching pets by breed:", error);
      res.status(500).json({ error: error.message });
    });
};

module.exports.updatePet = (req, res) => {
  const { breed, gender, age, description, isAdopted } = req.body;
  const petId = req.params.id;

  console.log("Received update request for pet:", petId);
  console.log("Updated fields:", {
    breed,
    gender,
    age,
    description,
    isAdopted,
  });

  const updatedFields = { breed, gender, age, description, isAdopted };

  Pet.findByIdAndUpdate(petId, updatedFields, { new: true })
    .then((updatedPet) => {
      if (!updatedPet) {
        return res.status(404).json({ error: "Pet not found" });
      }
      console.log("Pet updated successfully:", updatedPet);
      res.status(200).json(updatedPet);
    })
    .catch((error) => {
      console.error("Error updating pet:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    });
};

module.exports.deletePet = async (req, res) => {
  const petId = req.params.id;

  try {
    const deletedPet = await Pet.findByIdAndDelete(petId);
    if (!deletedPet) {
      return res
        .status(404)
        .json({ message: "Pet not found or already deleted" });
    }
    res.status(200).json({ message: "Pet deleted successfully", deletedPet });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
