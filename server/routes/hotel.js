var express = require('express');
var router = express.Router();
var hotelModel = require('../models/hotel');
var _ = require('lodash');

router.get('/', function(req, res){
    var pkg = {
        type: 'success',
        msg: 'Список отелей',
        data: hotelModel
    }
    res.json(pkg);
});

router.get('/:id', function(req, res){
    var index = _.findIndex(hotelModel, function(obj) { 
        return obj.id == req.params.id 
    });
    if(index >= 0) {
        res.json({
            type: 'success',
            msg: 'Успешный поиск отеля',
            data: hotelModel[index] 
        });
    } 
    else {
        res.json({
            type: 'error',
            msg: 'Отель не найден' 
        });
    }
})

module.exports = router;