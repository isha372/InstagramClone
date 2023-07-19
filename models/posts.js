/* eslint-disable import/no-extraneous-dependencies */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  posts.init({
    userId: DataTypes.INTEGER,
    likeId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    likeCount: DataTypes.INTEGER,
    commentCount: DataTypes.INTEGER,
    image_Url: DataTypes.STRING,
    caption: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};
