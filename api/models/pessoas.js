'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pessoas.hasMany(models.Turmas, {foreignkey: 'docente_id'})
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: {status: 'confirmado'},
        as: 'aulasMatriculadas'
      })
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado){
          if (dado.length <3) throw new Error('O campo nome deve ser maior que 3 caracteres!')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email:{ 
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'e-mail inválido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {
      where: {ativo: true}
    },
    scopes:{
      todos: {where: {}},
      //etc: {constraint: valor}
    },
  });
  return Pessoas;
};