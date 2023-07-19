/* eslint-disable import/no-extraneous-dependencies */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  likes.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'likes',
  });
  return likes;
};
