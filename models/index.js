/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0
      && file !== basename
      && file.slice(-3) === '.js'
      && file.indexOf('.test.js') === -1
  ))
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./users')(sequelize, DataTypes);
db.posts = require('./posts')(sequelize, DataTypes);
db.likes = require('./likes')(sequelize, DataTypes);
db.comments = require('./comments')(sequelize, DataTypes);

db.users.hasMany(db.posts, { foreignKey: 'userId' });
db.posts.belongsTo(db.users, { foreignKey: 'userId' });

db.users.hasMany(db.likes, { foreignKey: 'userId' });
db.likes.belongsTo(db.users, { foreignKey: 'userId' });

db.users.hasMany(db.comments, { foreignKey: 'userId' });
db.comments.belongsTo(db.users, { foreignKey: 'userId' });

db.posts.hasMany(db.likes, { foreignKey: 'postId' });
db.likes.belongsTo(db.posts, { foreignKey: 'postId' });

db.posts.hasMany(db.comments, { foreignKey: 'postId' });
db.comments.belongsTo(db.posts, { foreignKey: 'postId' });

module.exports = db;
