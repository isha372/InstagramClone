const {
  Model,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  users.init({
    userName: DataTypes.STRING,
    gmail: DataTypes.STRING,
    password: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
