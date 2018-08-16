var hotelModel = require('../models/hotel');
const { validationResult } = require('express-validator/check');
const errorFormat = require('../validators/format');

module.exports.index = function(req, res, next) {
    try {
        if(req.params.hasOwnProperty('id')){
            const errors = validationResult(req);
            var hotel = hotelModel.getHotelById(req.params.id);
            if(hotel !== null) 
                res.status(200).json({
                    type: 'success',
                    msg: 'Успешный поиск отеля',
                    data: hotel
                });
            else if(!errors.isEmpty()) {
                res.status(400).json({
                    type: 'validation_error',
                    data: errors.formatWith(errorFormat).array()
                });
            }
            else 
                res.status(404).json({
                    type: 'error',
                    msg: 'Отель не найден'
                });
        }
        else 
            res.status(200).json({
                type: 'success',
                msg: 'Успешный поиск отелей',
                data: hotelModel.getHotels()
            });
        
    }
    catch(err) {
        next('Ошибка поиска отеля');
    }
}

module.exports.add = function(req, res, next) {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                type: 'validation_error',
                data: errors.formatWith(errorFormat).array()
            })
        }
        else
        console.log(req.body);
            var hotel = req.body;
            hotel.id = hotelModel.length+1;
            hotelModel.push(hotel);
            res.status(200).json({
                type: 'success',
                msg: 'Отель успешно добавлен',
                data: hotel
            })
    }
    catch(err) {
        next('Ошибка добавления отеля');
    }
}