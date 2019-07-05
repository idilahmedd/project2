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
    models.profile.belongsTo(models.user);
    
    // models.profile.hasMany(models.event);
    
    

  };
  return profile;
};