const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const User = sequelize.define('users',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
  email: {type: DataTypes.TEXT('medium'), unique:true},
  login: {type: DataTypes.TEXT('medium'), unique:true},
  phone: {type: DataTypes.TEXT('medium')},
  name: {type: DataTypes.TEXT('medium')},
  password: {type: DataTypes.TEXT('medium')},
  role: {type: DataTypes.TEXT('medium'), defaultValue: "USER"}
})
const Animal = sequelize.define('animals',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT('medium')},
    breed: {type: DataTypes.TEXT('medium')},
    kind: {type: DataTypes.TEXT('medium')},
  })
  const Document = sequelize.define('document',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    guid: {type: DataTypes.TEXT('long'), unique:true},
    data: {type: DataTypes.TEXT('long')},
    name: {type: DataTypes.TEXT('medium')}
  })
  User.hasMany(Animal);
  Animal.hasOne(Document);
  Document.belongsTo(Animal);
  Animal.belongsTo(User);
  module.exports = {
    User,
    Animal,
    Document
  }