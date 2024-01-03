'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companyLogin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  companyLogin.init({
    companyID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    companyName: {
        type: DataTypes.STRING,
        required: true,
    },
    companyCode: {
        type: DataTypes.STRING,
        required: true,
    },
    companyLogo: {
        type: DataTypes.STRING,
        required: true,
    },
  }, {
    sequelize,
    modelName: 'companyLogin',
    timestamps: false
  });
  return companyLogin;
};