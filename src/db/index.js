const Sequelize = require('sequelize');
const dbConfig = require('../config/db');

const Kid = require('../models/Kid')
//const Activity = require('../models/Activity')

const connect = new Sequelize(dbConfig);

Kid.init(connect);
//Activity.init(connect);

module.exports = connect;