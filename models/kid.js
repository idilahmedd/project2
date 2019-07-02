'use strict';
module.exports = (sequelize, DataTypes) => {
  const kid = sequelize.define('kid', {
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    profileId: DataTypes.INTEGER
  }, {});
  kid.associate = function(models) {
    // associations can be defined here
    models.kid.belongsTo(models.profile);
    models.kid.hasMany(models.event); 

  };
  return kid;
};