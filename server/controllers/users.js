var models = require('../models');
var jwtConfig = require('../config').jwt;
var jwt = require('jsonwebtoken');
var md5 = require('md5');
var _ = require('lodash');

module.exports.index = function(req, res, next) {
    try {
        if(req.params.hasOwnProperty('id')){
            models.users.findById(req.params.id).then(function(user){
                if(user) {
                    res.status(200).json({
                        type: 'success',
                        msg: 'Успешный поиск пользователя',
                        data: user
                    });
                }
                else
                    res.status(404).json({
                        type: 'error',
                        msg: 'Пользователь не найден' 
                    });
            }).catch(function(error){
                console.log(error);
                next('Не удалось получить данные о пользователе');
            });
        }
        else {
            models.users.findAll().then(function(users){
                res.status(200).json({
                    type: 'success',
                    msg: 'Успешный поиск пользователей',
                    data: users
                });
            }).catch(function(error){
                console.log(error);
                next('Не удалось получить данные о пользователях');
            });
        }
    }
    catch(error) {
        console.log(error);
        next('Не удалось получить данные о пользователях');
    }
}

module.exports.login = function(req, res, next) {
    var { email, password } = req.body;
    try {
        models.users.findOne({where: {email: email, hash: md5(password)}}).then(function(user){
            if(user) {
                var token = jwt.sign({id: user.id}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});
                res.status(200).json({
                    type: 'success',
                    msg: 'Успешная авторизация',
                    data: {
                        token: token,
                        user: user.getResultData()
                    }
                });
            }
            else {
                res.status(403).json({
                    type: 'auth_error',
                    msg: 'Неверный email или пароль'
                });
            }
        }).catch(function(error){
            next('Ошибка авторизации');
        });
    }
    catch(error) {
        next('Ошибка авторизации');
    }
}

/*
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
}*/