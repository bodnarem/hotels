var express = require('express');
var router = express.Router();
const { validationResult } = require('express-validator/check');
const errorFormat = require('../validators/format');
var usersController = require('../controllers/users');
var userValidator = require('../validators/users');
const middlewares = require('../middlewares');

function isError(req, res, next) {
    const error = validationResult(req);
    if(!error.isEmpty())
        res.status(400).json({
            type: 'validation_error',
            data: error.formatWith(errorFormat).array()
        })
    else next();
}

router.get('/', middlewares.checkAuth, usersController.index);
router.get('/:id', middlewares.checkAuth, userValidator.id, isError, usersController.index);
router.post('/', userValidator.add, isError, usersController.add);
router.post('/login', userValidator.login, isError, usersController.login);

module.exports = router;