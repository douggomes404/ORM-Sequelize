'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Niveis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Niveis.hasMany(models.Turmas, {foreignKey: 'nivel_id'})
    }
  }
  Niveis.init({
    descre_nivel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Niveis',
    paranoid: true,
  });
  return Niveis;
};