module.exports = function(sequelize, DataType) {
    var User = sequelize.define('users', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataType.INTEGER(10).UNSIGNED
		},
		email: {
			type: DataType.STRING,
			allowNull: false,	
			notNull: true,
			validate: {
				isEmail: {args: true, msg: "Неверный формат email адреса"},
				isUnique: function(email, next) {
					User.findOne({where: {email: email}})
					.then(function(user){
						if(user) next("Пользователь с таким email уже зарегистрирован");
						else next();
					});
				}
			}
        },
        hash: {
            type: DataType.STRING(64),
            allowNull: false,
            notNull: true
        },
		firstname: {
			type: DataType.STRING(32),
			allowNull: false,
			validate: {
				len: {args: [2, 24], msg: "Неверный размер поля Имя"}
			}
		},
		middlename: {
			type: DataType.STRING(32),
			allowNull: true
        },
        lastname: {
			type: DataType.STRING(32),
			allowNull: false,
			validate: {
				len: {args: [2, 24], msg: "Неверный размер поля Фамилия"}
			}
		},
	},
	{
		timestamps: true,
		underscored: true,
		charset: 'utf8',
		indexes: [
			{
			  unique: true,
			  fields: ['email']
			}
		]
    });

    User.prototype.getResultData = function() {
        return {
			id: this.id,
			email: this.email,
			firstname: this.firstname,
			middlename: this.middlename,
			lastname: this.lastname,
			created_at: this.created_at,
			updated_at: this.updated_at
		}
    }

    return User;
}