var { body, param } = require('express-validator/check');
var { nameExists } = require('../models/hotel');

module.exports.id = [
    param('id').isNumeric().withMessage('Неверный id отеля')
]

module.exports.add = [
    body('name')
        .exists().withMessage('Поле обязательно для заполнения')
        .custom(function(value){
            if(nameExists(value))
                return Promise.reject('Отель с таким именем уже существует');
            else return true;
        }),
    body('img')
        .exists().withMessage('Поле обязательно для заполнения')
        .isURL().withMessage('Поле должно содержать верный url адрес до картинки'),
    body('stars')
        .isNumeric().withMessage('Неверный формат. Количество звезд должно быть числом')
        .exists().withMessage('Поле обязательно для заполнения')
]