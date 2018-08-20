var _ = require('lodash');
var bcrypt = require('bcrypt-nodejs');

const users = [
    {
        id: 1,
        email: 'admin@hotels.ru',
        firstname: 'Иван',
        middlename: 'Иванович',
        secondname: 'Иванов',
        hash: '$2a$10$M7ekwnib7VE3lklTVNL5d.X1VkNNbMCmzyAgJKMuhLutycvoh17pe'
    },
    {
        id: 2,
        email: 'svibl@gmail.com',
        firstname: 'Валерий',
        middlename: 'Юсупович',
        secondname: 'Свиблов',
        hash: '$2a$10$M7ekwnib7VE3lklTVNL5d.X1VkNNbMCmzyAgJKMuhLutycvoh17pe'
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

module.exports.emailExists = function(value) {
    try {
        var index = _.findIndex(users, function(obj) {
            return obj.email == value;
        });
        return (index >= 0) ? true : false;
    }
    catch(e) {
        console.log(e);
        return false;
    }
    
}

module.exports.find = function(email, password) {
    var index = _.findIndex(users, function(obj) { 
        return obj.email == email && bcrypt.compareSync(password, obj.hash); 
    });
    if(index >= 0)
        return getters(users[index]);
    else return null;
}