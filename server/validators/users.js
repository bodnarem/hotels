var { body, param } = require('express-validator/check');
var { emailExists } = require('../models/users');

module.exports.id = [
    param('id').isNumeric().withMessage('Неверный id пользователя')
]

module.exports.register = [
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
    body('password_confirm')
        .custom(function(value, { req }){
            if (value !== req.body.password) {
                return Promise.reject('Введенные пароли не совпадают');
            }
            else
                return true
        }),
    body('firstname')
        .exists().withMessage('Поле обязательно для заполнения')
        .isLength({min: 1, max: 32}).withMessage('Неверный размер поля Имя'),
    body('lastname')
        .exists().withMessage('Поле обязательно для заполнения')
        .isLength({min: 1, max: 32}).withMessage('Неверный размер поля Фамилия')
]

module.exports.login = [
    body('email')
        .exists().withMessage('Поле обязательно для заполнения'),
    body('password')
        .exists().withMessage('Поле обязательно для заполнения')
]