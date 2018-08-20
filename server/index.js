var dotenv = require('dotenv').config();
var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var routerIndex = require('./routes');
var routerHotel = require('./routes/hotel.js');
var usersRouter = require('./routes/users.js');
var app = express();

app.disable('x-powered-by');
app.use(async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
app.use('/api/v1', routerIndex);
app.use('/api/v1/hotels', routerHotel);
app.use('/api/v1/users', usersRouter);

app.use('*', function(req, res, next){
    res.send({
        'status': 'error',
        'msg': 'Неизвестный маршрут'
    })
});

// Errors
app.use(function(err, req, res, next){
    if(err.hasOwnProperty('msg') && err.hasOwnProperty('type'))
        res.send({
            'type': err.type,
            'msg': err.msg
        })
});

app.use(function(err, req, res, next){
    res.send({
        'type': 'error',
        'msg': 'Ошибка сервера',
        'err': err 
    })
});

app.listen(config.server.port, function(err){
    if(err)
        console.log(err);
    else
        console.log('Server start on port: %d', config.server.port);
})