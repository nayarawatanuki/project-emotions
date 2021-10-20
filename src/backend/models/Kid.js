const { Model, DataTypes } = require('sequelize');

class Kid extends Model {
    static init(sequelize) {
        super.init({
            photo: DataTypes.STRING,
            treatment: DataTypes.STRING,
            code: DataTypes.STRING,
            name: DataTypes.STRING,
            rate: DataTypes.STRING,
            birth: DataTypes.STRING,
            parent: DataTypes.STRING,
            note: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Task, { foreignKey: 'kid_id', as: 'tasks'});
    }
}

module.exports = Kid;