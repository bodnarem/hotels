var _ = require('lodash');

const hotels = [
    {
        id: 1,
        name: 'Гостинница Космос',
        stars: 5,
        img: '/hotels/kosmos.jpg'
    },
    {
        id: 2,
        name: 'Редисон Отель',
        stars: 3,
        img: '/hotels/redison.jpg'
    },
    {
        id: 3,
        name: 'Royals Garden',
        stars: 5,
        img: '/hotels/royals_garden.jpg'
    },
    {
        id: 4,
        name: 'Хостел у \"Котиков\"',
        stars: 2,
        img: '/hotels/u_kotikow.jpg'
    }
]

function getters(hotel) {
    return {
        id: hotel.id,
        name: hotel.name,
        stars: hotel.stars,
        img: hotel.img
    }
}

module.exports = hotels;

module.exports.getHotelById = function(id) {
    var index = _.findIndex(hotels, function(obj){
        return obj.id == id;
    });
    return (index >= 0) ? hotels[index] : null;
}

module.exports.getHotels = function() {
    return _.map(hotels, getters);
}

module.exports.nameExists = function(value) {
    var index = _.findIndex(hotels, function(obj) {
        return obj.name == value;
    });
    return (index >= 0) ? true : false;
}