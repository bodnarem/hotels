var jwt = require('jsonwebtoken');
var jwtConfig = require('../config').jwt;

module.exports.checkAuth = function(req, res, next)
{
    var tokenString = req.headers['authorization'];
    if(typeof tokenString !== 'undefined')
    {
        var token = tokenString.split(' ')[1];
        jwt.verify(token, jwtConfig.secret, function(err, decode){
            if(err) return next({type: 'auth_error', msg: 'Ошибка верификации токена'});
            else {
                req.user = decode;
                next();
            }
        });
    }
    else next({type: 'auth_error', msg: 'Ошибка доступа. Требуется авторизация'});
};