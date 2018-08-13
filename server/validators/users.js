var { param } = require('express-validator/check');

module.exports.id = [
    param('id').isNumeric().withMessage('Неверный id пользователя')
]