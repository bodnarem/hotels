var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var userValidator = require('../validators/users');

router.get('/', usersController.index);
router.get('/:id', userValidator.id, usersController.index);

module.exports = router;