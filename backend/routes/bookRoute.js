// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController.js');

router.get('/', bookController.getAllBookings);
router.get('/:id', bookController.getBookingById);
router.post('/create', bookController.createBooking); // Ensure this route is correct
router.put('/update/:id', bookController.updateBooking);
router.delete('/delete/:id', bookController.deleteBooking);

module.exports = router;


