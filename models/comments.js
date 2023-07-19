/* eslint-disable import/no-extraneous-dependencies */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  comments.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    commentsData: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};
