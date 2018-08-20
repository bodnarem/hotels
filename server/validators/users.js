var { body, param } = require('express-validator/check');
var { emailExists } = require('../models/users');

module.exports.id = [
    param('id').isNumeric().withMessage('Неверный id пользователя')
]

module.exports.add = [
    body('email')
        .exists().withMessage('Поле обязательно для заполнения')
        .isEmail().withMessage('Неверный формат email адреса')
        .custom(function(value){
            if(emailExists(value))
                return Promise.reject('Пользователь с таким e-mail уже существует');
            else return true;
        }),
    body('password')
        .exists().withMessage('Поле обязательно для заполнения')
        .isLength({min: 5}).withMessage('Минимальная длина пароля 5 символов'),
    body('firstname')
        .exists().withMessage('Поле обязательно для заполнения')
        .isLength({max: 32}).withMessage('Слишком длинное имя')
]

module.exports.login = [
    body('email')
        .exists().withMessage('Поле обязательно для заполнения'),
    body('password')
        .exists().withMessage('Поле обязательно для заполнения')
]