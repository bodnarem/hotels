var _ = require('lodash');

const users = [
    {
        id: 1,
        email: 'admin@hotels.ru',
        firstname: 'Иван',
        middlename: 'Иванович',
        secondname: 'Иванов',
        hash: '827ccb0eea8a706c4c34a16891f84e7b'
    },
    {
        id: 2,
        email: 'svibl@gmail.com',
        firstname: 'Валерий',
        middlename: 'Юсупович',
        secondname: 'Свиблов',
        hash: '827ccb0eea8a706c4c34a16891f84e7b'
    },
    {
        id: 3,
        email: 'test@mail.ru',
        firstname: 'Петр',
        middlename: 'Семенович',
        secondname: 'Капустин',
        hash: '827ccb0eea8a706c4c34a16891f84e7b'
    }
]

module.exports = users;

function getters(user) {
    return {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        secondname: user.secondname,
        middlename: user.middlename
    }
}

module.exports.getUsers = function() {
    return _.map(users, getters);
}

module.exports.getUserById = function(id) {
    var index = _.findIndex(users, function(obj) { 
        return obj.id == id 
    });
    if(index >= 0)
        return getters(users[index]);
    else return null;
}