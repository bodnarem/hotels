var userModel = require('../models/users');
var jwtConfig = require('../config').jwt;
var jwt = require('jsonwebtoken');

module.exports.index = function(req, res, next) {
    try {
        if(req.params.hasOwnProperty('id')){
            var user = userModel.getUserById(req.params.id);
            if( user !== null) {
                res.json({
                    type: 'success',
                    msg: 'Успешный поиск пользователя',
                    data: user
                });
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

module.exports.login = function(req, res, next) {
    var { email, password } = req.body;
    try {
        var user = userModel.find(email, password);
        if(user !== null)
        {
            var token = jwt.sign({id: user.id}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});
            res.status(200).json({
                type: 'success',
                msg: 'Успешная авторизация',
                data: {
                    token: token,
                    user: user
                }
            });
        }
        else
            res.status(403).json({
                type: 'auth_error',
                msg: 'Неверный email или пароль'
            });
    }
    catch(err) {
        console.log(err);
        next('Ошибка авторизации');
    }
}

module.exports.register = function(req, res, next) {
    try {
        var newUser = userModel.addUser(req.body);
        var token = jwt.sign({id: newUser.id}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});
        res.status(200).json({
            type: 'success',
            msg: 'Пользователь добавлен',
            data: {
                user: newUser,
                token: token
            }
        });
    }
    catch(err) {
        console.log('controller ' + err);
        next('Ошибка регистрации пользователя');
    }
}