var express = require('express');
var router = express.Router();
var hotelController = require('../controllers/hotels');
var hotelValidator = require('../validators/hotel');

router.get('/', hotelController.index);
router.get('/:id', hotelValidator.id, hotelController.index);
router.post('/', hotelValidator.add, hotelController.add);

module.exports = router;