/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      likeId: {
        type: Sequelize.INTEGER,
      },
      commentId: {
        type: Sequelize.INTEGER,
      },
      likeCount: {
        type: Sequelize.INTEGER,
      },
      commentCount: {
        type: Sequelize.INTEGER,
      },
      image_Url: {
        type: Sequelize.STRING,
      },
      caption: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('posts');
  },
};
