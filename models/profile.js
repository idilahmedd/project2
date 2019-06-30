'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define('profile', {
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  profile.associate = function(models) {
    // associations can be defined here
  };
  return profile;
};