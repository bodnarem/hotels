var userModel = require('../models/users');
const { validationResult } = require('express-validator/check');
const errorFormat = require('../validators/format');

module.exports.index = function(req, res, next) {
    try {
        if(req.params.hasOwnProperty('id')){
            const errors = validationResult(req);
            var user = userModel.getUserById(req.params.id);
            if( user !== null) {
                res.json({
                    type: 'success',
                    msg: 'Успешный поиск пользователя',
                    data: user
                });
            } 
            else if(!errors.isEmpty()) {
                res.status(400).json({
                    type: 'validation_error',
                    data: errors.formatWith(errorFormat).array()
                })
            }
            else {
                res.status(404).json({
                    type: 'error',
                    msg: 'Пользователь не найден' 
                });
            }
        }
        else
            res.status(200).json({
                type: 'success',
                msg: 'Успешный поиск пользователей',
                data: userModel.getUsers()
            });
    }
    catch(err) {
        console.log(err);
        next('Не удалось получить данные о пользователях');
    }
}

module.exports.add = function(req, res, next) {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        
        const newUser = {
            id: userModel.length+1,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            secondname: req.body.secondname,
            email: req.body.email
        };

        try {
            userModel.push(newUser);
        }
        catch(err) {
            console.log(err);
            next('Не удалось добавить нового пользователя');
        }
        
        res.status(200).json({
            type: 'success',
            msg: 'Пользователь добавлен',
            data: newUser
        });
    }
    else {
        res.status(400).json({
            type: 'validation_error',
            data: errors.formatWith(errorFormat).array()
        })
    }
}